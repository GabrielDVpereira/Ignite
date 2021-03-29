import { ClientConfig } from "faunadb";

export default {
  secret: process.env.FAUNA_DEV_KEY,
  domain: "database",
  scheme: "http",
  port: 8443,
} as ClientConfig;
