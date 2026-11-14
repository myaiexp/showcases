// A stand-in third-party widget that only knows fetch(url, { method })

/** The only thing the widget knows about: a fetch-shaped function. */
export type FetchLike = (url: string, init?: { method?: string }) => Promise<Response>;

/** Loads the user list with whatever fetch it was given and says what it found. */
export async function userBadge(fetchLike: FetchLike): Promise<string> {
  const response = await fetchLike('/users', { method: 'GET' });
  if (!response.ok) return `Widget: the server said ${response.status}, showing "sign in"`;
  const users = (await response.json()) as unknown[];
  return `Widget: ${users.length} users loaded`;
}
