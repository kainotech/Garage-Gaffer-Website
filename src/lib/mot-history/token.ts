import { UpstreamError } from "./types";

/**
 * OAuth2 client-credentials token, cached in module scope. Next.js fetch()
 * memoization does not apply inside Route Handlers, so this must be
 * hand-rolled. Tokens last 60 minutes; renewed 60s before actual expiry.
 * A serverless cold start resets this cache - that's fine, it just means a
 * fresh token fetch, not a correctness issue.
 */
let cachedToken: { accessToken: string; expiresAt: number } | null = null;
let pendingTokenRequest: Promise<string> | null = null;

const RENEW_BUFFER_MS = 60_000;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - RENEW_BUFFER_MS) {
    return cachedToken.accessToken;
  }

  if (pendingTokenRequest) {
    return pendingTokenRequest;
  }

  pendingTokenRequest = fetchNewToken().finally(() => {
    pendingTokenRequest = null;
  });

  return pendingTokenRequest;
}

async function fetchNewToken(): Promise<string> {
  const tokenUrl = process.env.MOT_HISTORY_TOKEN_URL;
  const scope = process.env.MOT_HISTORY_SCOPE;
  const clientId = process.env.MOT_HISTORY_CLIENT_ID;
  const clientSecret = process.env.MOT_HISTORY_CLIENT_SECRET;

  if (!tokenUrl || !scope || !clientId || !clientSecret) {
    throw new UpstreamError("MOT History API credentials are not configured.");
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope,
  });

  let response: Response;
  try {
    response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
  } catch {
    throw new UpstreamError("Could not reach the vehicle lookup service.");
  }

  if (!response.ok) {
    console.error("MOT History API token request failed", response.status, await safeText(response));
    throw new UpstreamError();
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.accessToken;
}

async function safeText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return "";
  }
}
