export class StripeIdentityHttpError extends Error {
  readonly status: number;
  readonly responseBody: unknown;

  constructor(status: number, responseBody: unknown) {
    super(`Stripe Identity API request failed with status ${status}`);
    this.name = "StripeIdentityHttpError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

async function decodeResponse(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return undefined;
  const contentType = response.headers.get("content-type")
    ?.split(";", 1)[0]
    ?.trim()
    .toLowerCase() ?? "";
  if (contentType === "application/json" || contentType.endsWith("+json")) {
    return response.json();
  }
  return response.text();
}

export function createStripeIdentityRequest(fetchFn: typeof fetch = fetch) {
  return async (url: string, init: RequestInit): Promise<unknown> => {
    const response = await fetchFn(url, init);
    const body = await decodeResponse(response);
    if (!response.ok) throw new StripeIdentityHttpError(response.status, body);
    return body;
  };
}
