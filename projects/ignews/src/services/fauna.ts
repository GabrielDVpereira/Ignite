/**
 * For local setup: https://dev.to/englishcraig/how-to-set-up-faunadb-for-local-development-5ha7
 *
 */
import { Client } from "faunadb";
import { faunaConfig, faunaDevConfig } from "../config";

const config =
  process.env.NODE_ENV === "development" ? faunaDevConfig : faunaConfig;

export const fauna = new Client(config);
