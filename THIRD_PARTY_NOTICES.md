# Third-party notices

The generated Stripe Identity API types and metadata are derived from Stripe's
official `stripe/openapi` repository at immutable revision:

`325f3b157f7250f2a5d228b870d77bb63fc7e54c`

Source repository: <https://github.com/stripe/openapi>

The selected Stripe Identity contract paths and their transitive Identity
Schemas are licensed under the MIT License. A byte-for-byte copy of the pinned
upstream license is distributed at `LICENSES/MIT-stripe-openapi.txt`; its
SHA-256 is
`8c1ce883f4eee7b531e0b7872dbfc72d410ced87dfff9501305de05ca8d203e5`.

The checked-in normalized OpenAPI document is a build input and is not shipped
in the npm package. The common Stripe error envelope is projected to public
fields relevant to Identity while allowing additional provider fields, so
unrelated Stripe payments and billing Schemas are not falsely presented as
part of the Identity product.

Pontx is not affiliated with Stripe. Stripe and Stripe Identity are trademarks
of Stripe, Inc. No endorsement is claimed.
