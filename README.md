# @pontx/stripe-identity

Type-safe Stripe Identity SDK and privacy-first CLI generated from the complete
Stripe Identity path boundary in Stripe's official OpenAPI contract.

This is a Pontx community SDK, not an official Stripe product. The contract is
pinned to `stripe/openapi` revision
`325f3b157f7250f2a5d228b870d77bb63fc7e54c` and covers all 8 Stripe Identity
Endpoints across verification sessions and verification reports.

## Privacy and safety

- Calls go directly from your local SDK/CLI process to `api.stripe.com`.
- Pontx Hub never proxies, caches, logs, or stores Stripe Identity traffic.
- `STRIPE_SECRET_KEY` remains in your process environment and is redacted from
  CLI previews.
- Creating, updating, canceling, and redacting sessions is preview-first and
  requires a short-lived confirmation token bound to the exact request.
- Redaction is irreversible and may remove identity documents, selfies,
  identity numbers, contact details, request logs, and related verification
  data. Review Stripe's retention and privacy requirements before use.

## SDK

```bash
pnpm add @pontx/stripe-identity
```

```ts
import { createStripeIdentityClient } from "@pontx/stripe-identity";

const client = createStripeIdentityClient({
  secretKey: process.env.STRIPE_SECRET_KEY,
});

const sessions = await client.getIdentityVerificationSessions({ limit: 10 });
```

The SDK defaults to Stripe's Bearer authentication and can also use the Basic
scheme declared by the official contract:

```ts
const client = createStripeIdentityClient({
  secretKey: process.env.STRIPE_SECRET_KEY,
  authScheme: "basic",
});
```

## CLI

```bash
export STRIPE_SECRET_KEY='...'
pontx-stripe-identity list apis
```

Mutation requests must be previewed and confirmed without changing the
request:

```bash
pontx-stripe-identity call PostIdentityVerificationSessions \
  --body '{"type":"document"}' --dry-run
# Review the redacted request and copy its ptx1... token.
pontx-stripe-identity call PostIdentityVerificationSessions \
  --body '{"type":"document"}' --confirm 'ptx1...'
```

## Contract provenance

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The metadata repository
contains the deterministic subproduct importer, source hashes, bilingual
prose, protocol validation, and the admission risk review.

## Release boundary

Publishing is operator-owned. `prepublishOnly` checks exact registry
dependencies, a frozen lockfile, generated-source drift, 100% passing unit
tests with no skipped tests, built-package E2E, and npm package contents.

## License

SDK code is MIT licensed. Upstream OpenAPI material retains Stripe's MIT
license and attribution.
