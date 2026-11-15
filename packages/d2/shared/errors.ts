// Turns D2.js's error messages into readable lines

/**
 * D2.js rejects a failed compile with the compiler's error list as JSON text:
 * `[{"range":"index,0:0:0-0:5:5","errmsg":"index:1:1: connection missing destination"}]`.
 * This returns one "line:col: message" string per error, or the message as it came.
 */
export function d2Errors(err: unknown): string[] {
  const message = err instanceof Error ? err.message : String(err);
  try {
    const list: unknown = JSON.parse(message);
    if (Array.isArray(list)) {
      return list.map((e: { errmsg?: string }) => (e.errmsg ?? JSON.stringify(e)).replace(/^[^:]*:(\d+:\d+:)/, '$1'));
    }
  } catch {
    // Not JSON: a plain message such as "layout option 'tala' not recognized".
  }
  // A Go panic arrives with its whole stack; the first line says what happened.
  return [message.split('\n')[0] ?? message];
}

/** The errors as one string, for a caption or status line. */
export function d2ErrorText(err: unknown): string {
  return d2Errors(err).join(' · ');
}
