import { ClientConfig } from "faunadb";

export default {
  secret: process.env.FAUNA_KEY,
  domain: process.env.FAUNA_DOMAIN,
  scheme: "https",
} as ClientConfig;
