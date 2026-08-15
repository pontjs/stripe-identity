import { createGracefulClient } from "@pontx/sdk";
import type { APIs } from "./apis/stripe-identity/apis";
import { specMeta } from "./apis/stripe-identity/apiMeta";
import {
  resolveStripeIdentityAuthorization,
  type StripeIdentityCredentials,
} from "./auth";
import { createStripeIdentityRequest } from "./transport";

export type StripeIdentityClientConfig = StripeIdentityCredentials & {
  baseUrl?: string;
  fetch?: typeof fetch;
};

export type StripeIdentityClient = APIs;

export function createStripeIdentityClient(config: StripeIdentityClientConfig): StripeIdentityClient {
  const authorization = resolveStripeIdentityAuthorization(config);
  return createGracefulClient<APIs>({
    pontxSpecMeta: specMeta as never,
    baseUrl: config.baseUrl || "https://api.stripe.com",
    baseRequestFn: createStripeIdentityRequest(config.fetch),
    beforeRequest: async (url, init) => {
      const headers = new Headers(init.headers);
      headers.set("Authorization", authorization);
      return { url, init: { ...init, headers } };
    },
  }) as unknown as StripeIdentityClient;
}

export { StripeIdentityHttpError } from "./transport";
export type { StripeIdentityAuthScheme, StripeIdentityCredentials } from "./auth";
export type { APIs } from "./apis/stripe-identity/apis";
export * as schemas from "./apis/stripe-identity/schemas";

export default createStripeIdentityClient;
