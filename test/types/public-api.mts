import { createStripeIdentityClient } from "../../dist/index.mjs";

const client = createStripeIdentityClient({
  secretKey: "sk_test_type_fixture",
  fetch: async () => new Response("{}", { headers: { "content-type": "application/json" } }),
});

client.getIdentityVerificationSessions({ limit: 10 });
client.getIdentityVerificationSessionsSession("vs_fixture", {});
client.postIdentityVerificationSessions({ type: "document" });
client.postIdentityVerificationSessionsSessionRedact("vs_fixture", {});

// @ts-expect-error Untagged Endpoints must not acquire a synthetic controller.
client.common.getIdentityVerificationSessions({ limit: 10 });
