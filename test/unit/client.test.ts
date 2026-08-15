import { describe, expect, it, vi } from "vitest";
import { resolveStripeIdentityAuthorization } from "../../src/auth";
import { createStripeIdentityClient, StripeIdentityHttpError } from "../../src/index";

describe("@pontx/stripe-identity", () => {
  it("requires a credential and implements both official authentication schemes", () => {
    expect(() => resolveStripeIdentityAuthorization({})).toThrow(/STRIPE_SECRET_KEY/);
    expect(resolveStripeIdentityAuthorization({ secretKey: "sk_test_fixture" }))
      .toBe("Bearer sk_test_fixture");
    expect(resolveStripeIdentityAuthorization({ secretKey: "sk_test_fixture", authScheme: "basic" }))
      .toBe(`Basic ${Buffer.from("sk_test_fixture:").toString("base64")}`);
  });

  it("keeps all eight untagged Endpoints flat without a synthetic controller", () => {
    const client = createStripeIdentityClient({
      secretKey: "sk_test_fixture",
      fetch: vi.fn() as unknown as typeof fetch,
    });
    expect(Object.keys(client)).toHaveLength(8);
    expect(Object.keys(client)).toContain("getIdentityVerificationSessions");
    expect(Object.keys(client)).toContain("postIdentityVerificationSessionsSessionRedact");
    expect("common" in client).toBe(false);
    expect("default" in client).toBe(false);
  });

  it("serializes GET query parameters and Bearer authentication without a request body", async () => {
    const payload = { object: "list", url: "/v1/identity/verification_sessions", has_more: false, data: [] };
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    }));
    const client = createStripeIdentityClient({ secretKey: "sk_test_fixture", fetch: fetchMock });

    await expect(client.getIdentityVerificationSessions({ limit: 10 })).resolves.toEqual(payload);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.stripe.com/v1/identity/verification_sessions?limit=10");
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer sk_test_fixture");
  });

  it("serializes mutation bodies as Stripe form data", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "vs_fixture" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    }));
    const client = createStripeIdentityClient({ secretKey: "sk_test_fixture", fetch: fetchMock });

    await client.postIdentityVerificationSessions({ type: "document" });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.stripe.com/v1/identity/verification_sessions");
    expect(init.method).toBe("POST");
    expect(new Headers(init.headers).get("content-type")).toBe("application/x-www-form-urlencoded");
    expect(init.body?.toString()).toBe("type=document");
  });

  it("throws a typed error without including credentials", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      error: { type: "invalid_request_error", message: "Denied" },
    }), { status: 401, headers: { "content-type": "application/json" } }));
    const client = createStripeIdentityClient({ secretKey: "never-log-this", fetch: fetchMock });

    await expect(client.getIdentityVerificationSessions({})).rejects.toMatchObject<
      Partial<StripeIdentityHttpError>
    >({
      name: "StripeIdentityHttpError",
      status: 401,
      responseBody: { error: { type: "invalid_request_error", message: "Denied" } },
    });
  });
});
