export type StripeIdentityAuthScheme = "bearer" | "basic";

export type StripeIdentityCredentials = {
  secretKey?: string;
  authScheme?: StripeIdentityAuthScheme;
};

export function resolveStripeIdentityAuthorization(
  credentials: StripeIdentityCredentials,
): string {
  const secretKey = credentials.secretKey?.trim();
  if (!secretKey) {
    throw new Error("Configure STRIPE_SECRET_KEY before calling Stripe Identity");
  }
  if (credentials.authScheme === "basic") {
    return `Basic ${Buffer.from(`${secretKey}:`, "utf8").toString("base64")}`;
  }
  return `Bearer ${secretKey}`;
}
