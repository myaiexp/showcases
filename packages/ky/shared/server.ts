// A pretend server that answers Ky through its fetch option: no network
//
// Examples hand `server.fetch` to Ky (`ky.extend({fetch: server.fetch})`), the way the docs'
// FAQ mocks Ky in tests. The server sees each request exactly as Ky built it (method, URL,
// headers, body), answers from the example's routes, and reports every step to listeners such
// as the wire picture. Each exchange takes one `latency` out, `delay` at the server and one
// `latency` back, so the picture's travelling packets land when Ky really gets its answer.
// While any server is alive, a guard on globalThis.fetch refuses requests to *.example hosts,
// so an example that forgets the option fails loudly instead of going to the network.
import { readBody, buildResponse, STATUS_TEXT } from './server-body.ts';

export interface Seen {
  id: number;
  method: string;
  url: URL;
  headers: Headers;
  /** The body as text, '' when there is none. */
  body: string;
  /** Which request to this route this is, counting from 1. */
  n: number;
  /** Milliseconds since the server was created, when Ky handed the request over. */
  at: number;
}

export interface Reply {
  /** Default 200. */
  status?: number;
  json?: unknown;
  text?: string;
  bytes?: Uint8Array;
  headers?: Record<string, string>;
  /** Thinking time at the server for this reply, instead of `server.delay`. */
  delay?: number;
  /** Lose the connection halfway: fetch rejects with TypeError('Failed to fetch'). */
  drop?: boolean;
  /** Never answer, until the request is aborted. */
  hang?: boolean;
  /** Send the body in `pieces` parts, `every` ms apart (download progress). */
  stream?: { pieces: number; every: number };
}

export type Handler = Reply | ((req: Seen) => Reply | Promise<Reply>);

export type ServerEvent =
  | { kind: 'send'; req: Seen }
  | { kind: 'arrive'; req: Seen }
  | { kind: 'reply'; req: Seen; status: number }
  | { kind: 'piece'; req: Seen; sent: number; total: number }
  | { kind: 'drop'; req: Seen }
  | { kind: 'abort'; req: Seen }
  /** Upload: the server read `read` bytes of the request body so far. */
  | { kind: 'upload'; req: Seen; read: number };

export interface ServerOptions {
  /** Thinking time at the server, ms. Default 150. */
  delay?: number;
  /** One-way travel time, ms. Default 220. */
  latency?: number;
  /** Read request bodies chunk by chunk, this many ms apart (upload progress). */
  readPace?: number;
}

export interface Server {
  /** Pass this as Ky's `fetch` option. */
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  /** Every request so far, oldest first. */
  readonly requests: Seen[];
  /** Adds a route: 'GET /users', '/users', a prefix such as '/files/*', or '*' for the rest. */
  route(key: string, handler: Handler): void;
  /** Listens to every step; returns an unsubscribe. */
  on(fn: (e: ServerEvent) => void): () => void;
  delay: number;
  latency: number;
  /** Forgets the requests and the per-route counts. */
  reset(): void;
  dispose(): void;
}

export const STOPPED = new DOMException('The example was closed', 'AbortError');
let alive = 0;
let nativeFetch: typeof fetch | null = null;

function guardNetwork(on: boolean): void {
  alive += on ? 1 : -1;
  if (on && alive === 1) {
    nativeFetch = globalThis.fetch;
    const real = nativeFetch;
    globalThis.fetch = (input, init) => {
      const url = new URL(input instanceof Request ? input.url : String(input), document.baseURI);
      if (url.hostname.endsWith('.example')) {
        return Promise.reject(new Error(`A Ky example sent ${url.href} past its pretend server: pass {fetch: server.fetch}`));
      }
      return real(input, init);
    };
  } else if (!on && alive === 0 && nativeFetch) {
    globalThis.fetch = nativeFetch;
    nativeFetch = null;
  }
}

export function createServer(routes: Record<string, Handler> = {}, opts: ServerOptions = {}): Server {
  const table = new Map(Object.entries(routes));
  const counts = new Map<string, number>();
  const listeners = new Set<(e: ServerEvent) => void>();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const pending = new Set<(reason: unknown) => void>();
  const born = performance.now();
  let disposed = false;
  let nextId = 1;
  guardNetwork(true);

  const emit = (e: ServerEvent): void => {
    for (const fn of listeners) fn(e);
  };
  /** Waits `ms`, rejecting with the abort reason if `signal` fires or the server is disposed. */
  const sleep = (ms: number, signal: AbortSignal): Promise<void> =>
    new Promise((resolve, reject) => {
      if (disposed) return reject(STOPPED);
      if (signal.aborted) return reject(signal.reason);
      const fail = (reason: unknown): void => {
        clearTimeout(id);
        timers.delete(id);
        pending.delete(fail);
        signal.removeEventListener('abort', onAbort);
        reject(reason);
      };
      const onAbort = (): void => fail(signal.reason);
      const id = setTimeout(() => {
        timers.delete(id);
        pending.delete(fail);
        signal.removeEventListener('abort', onAbort);
        resolve();
      }, ms);
      timers.add(id);
      pending.add(fail);
      signal.addEventListener('abort', onAbort, { once: true });
    });

  const find = (method: string, path: string): [string, Handler] | undefined => {
    for (const key of [`${method} ${path}`, path]) {
      const h = table.get(key);
      if (h) return [key, h];
    }
    for (const [key, h] of table) {
      const pattern = key.replace(/^[A-Z]+ /, '');
      const wantMethod = key.includes(' ') ? key.split(' ')[0] : null;
      if (pattern.endsWith('*') && path.startsWith(pattern.slice(0, -1)) && (!wantMethod || wantMethod === method)) return [key, h];
    }
    return undefined;
  };

  const server: Server = {
    requests: [],
    delay: opts.delay ?? 150,
    latency: opts.latency ?? 220,
    route(key, handler) {
      table.set(key, handler);
    },
    on(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    reset() {
      server.requests.length = 0;
      counts.clear();
    },
    async fetch(input, init) {
      // Ky passes a Request plus the options it does not know; those are ignored here.
      const request = input instanceof Request ? input : new Request(input, init);
      const signal = request.signal;
      const url = new URL(request.url);
      const match = find(request.method, url.pathname);
      const key = match?.[0] ?? '404';
      const n = (counts.get(key) ?? 0) + 1;
      counts.set(key, n);
      const seen: Seen = {
        id: nextId++,
        method: request.method,
        url,
        headers: new Headers(request.headers),
        body: '',
        n,
        at: Math.round(performance.now() - born),
      };
      server.requests.push(seen);
      emit({ kind: 'send', req: seen });
      const abortable = <T>(p: Promise<T>): Promise<T> =>
        p.catch((err: unknown) => {
          if (signal.aborted && err === signal.reason) emit({ kind: 'abort', req: seen });
          throw err;
        });
      // Travel out, read the body as it arrives, then think.
      await abortable(sleep(server.latency, signal));
      seen.body = await abortable(readBody(request, opts.readPace, sleep, signal, (read) => emit({ kind: 'upload', req: seen, read })));
      emit({ kind: 'arrive', req: seen });
      const handler = match?.[1] ?? { status: 404, json: { error: 'Not found' } };
      const reply = typeof handler === 'function' ? await handler(seen) : handler;
      if (reply.drop) {
        emit({ kind: 'drop', req: seen });
        throw new TypeError('Failed to fetch');
      }
      if (reply.hang) {
        await abortable(sleep(2 ** 31 - 1, signal));
      }
      await abortable(sleep(reply.delay ?? server.delay, signal));
      const status = reply.status ?? 200;
      emit({ kind: 'reply', req: seen, status });
      await abortable(sleep(server.latency, signal));
      return buildResponse(request, reply, status, STATUS_TEXT[status] ?? '', {
        sleep: (ms) => sleep(ms, signal),
        piece: (sent, total) => emit({ kind: 'piece', req: seen, sent, total }),
      });
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const id of timers) clearTimeout(id);
      for (const fail of [...pending]) fail(STOPPED);
      timers.clear();
      listeners.clear();
      guardNetwork(false);
    },
  };
  return server;
}
