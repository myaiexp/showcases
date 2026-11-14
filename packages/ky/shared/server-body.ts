// Bodies for the pretend server: reading uploads, building answers
import type { Reply } from './server.ts';

export const STATUS_TEXT: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  205: 'Reset Content',
  301: 'Moved Permanently',
  302: 'Found',
  304: 'Not Modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  409: 'Conflict',
  413: 'Payload Too Large',
  418: "I'm a teapot",
  422: 'Unprocessable Content',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

const NULL_BODY = new Set([101, 103, 204, 205, 304]);

/** Reads a request body as text, chunk by chunk `pace` ms apart when a pace is set. */
export async function readBody(
  request: Request,
  pace: number | undefined,
  sleep: (ms: number, signal: AbortSignal) => Promise<void>,
  signal: AbortSignal,
  onRead: (bytes: number) => void,
): Promise<string> {
  if (!request.body) return '';
  if (!pace) return request.text();
  const reader = request.body.getReader();
  const parts: Uint8Array[] = [];
  let read = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
      read += value.byteLength;
      onRead(read);
      await sleep(pace, signal);
    }
  } finally {
    reader.releaseLock();
  }
  const all = new Uint8Array(read);
  let at = 0;
  for (const p of parts) {
    all.set(p, at);
    at += p.byteLength;
  }
  return new TextDecoder().decode(all);
}

interface Pacing {
  sleep(ms: number): Promise<void>;
  piece(sent: number, total: number): void;
}

/** Builds the Response for a reply, streaming it in pieces when `reply.stream` is set. */
export function buildResponse(request: Request, reply: Reply, status: number, statusText: string, pacing: Pacing): Response {
  const headers = new Headers(reply.headers);
  let bytes: Uint8Array | null = null;
  if (reply.json !== undefined) {
    bytes = new TextEncoder().encode(JSON.stringify(reply.json));
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
  } else if (reply.text !== undefined) {
    bytes = new TextEncoder().encode(reply.text);
    if (!headers.has('content-type')) headers.set('content-type', 'text/plain;charset=utf-8');
  } else if (reply.bytes) {
    bytes = reply.bytes;
  }
  if (NULL_BODY.has(status) || request.method === 'HEAD') {
    if (bytes && !headers.has('content-length')) headers.set('content-length', String(bytes.byteLength));
    return new Response(null, { status, statusText, headers });
  }
  const body = bytes ?? new Uint8Array(0);
  if (!headers.has('content-length')) headers.set('content-length', String(body.byteLength));
  if (!reply.stream) return new Response(body.slice(), { status, statusText, headers });

  const { pieces, every } = reply.stream;
  const size = Math.max(1, Math.ceil(body.byteLength / pieces));
  let sent = 0;
  let first = true;
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (!first) await pacing.sleep(every);
      first = false;
      const chunk = body.slice(sent, sent + size);
      sent += chunk.byteLength;
      pacing.piece(sent, body.byteLength);
      if (chunk.byteLength) controller.enqueue(chunk);
      if (sent >= body.byteLength) controller.close();
    },
  });
  return new Response(stream, { status, statusText, headers });
}
