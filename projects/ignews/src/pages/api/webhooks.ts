import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { Stripe } from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

// since our response comes in json, we disable the bodyParse because the stripe webhook sends the request as a stream of data
export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set(["checkout.session.completed"]);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const buf = await buffer(req);

    // secret sent from stripe for us to protect our the webhook route
    const secret = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      // extract the event sent from the stripe and verify if the secret sent is the one we expect
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(), // we parse to string to assure ts it will be always a string and not the stripe obj
              checkoutSession.customer.toString()
            );
            break;
          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        // we dont send error status because stripe will retry to redo the request if we do so
        return res.json({ error: "Webhook handler failed" });
      }
    }

    res.status(200).json({ recieved: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
