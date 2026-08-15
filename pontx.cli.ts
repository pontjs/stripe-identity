import { runCLI } from "pontx/sdk-cli";
import { resolveStripeIdentityAuthorization } from "./src/auth";

export default runCLI({
  name: "pontx-stripe-identity",
  executeApi: {
    baseURL: "https://api.stripe.com",
    beforeRequest: (request) => {
      const headers = new Headers(request.init.headers);
      headers.set(
        "Authorization",
        resolveStripeIdentityAuthorization({ secretKey: process.env.STRIPE_SECRET_KEY }),
      );
      return { ...request, init: { ...request.init, headers } };
    },
  },
  generateSamples: [{
    case: "nodejs",
    description: "Generate a safe Node.js SDK sample",
    generateSample: async () => `import { createStripeIdentityClient } from "@pontx/stripe-identity";

async function main() {
  const client = createStripeIdentityClient({
    secretKey: process.env.STRIPE_SECRET_KEY,
  });

  const response = await client.getIdentityVerificationSessions({ limit: 10 });
  console.log(response);
}

main();
`,
  }],
});
