// In-memory server at https://api.example: the fetch every example gives wretch
import { readBody, type RequestBody } from './server-body.ts';
import { sleep } from './sleep.ts';
import type { Stage } from './stage.ts';

export type { RequestBody } from './server-body.ts';

/** The made-up host every example talks to. Nothing is ever sent over the network. */
export const BASE = 'https://api.example';

export interface ServerRequest {
  /** 1, 2, 3… in the order requests arrived. */
  id: number;
  method: string;
  /** The full URL as wretch built it. */
  url: string;
  path: string;
  query: URLSearchParams;
  headers: Headers;
  /** Header names exactly as sent (`headers` lowercases them and merges duplicates). */
  headerList: [string, string][];
  body: RequestBody;
  /** The other fetch options it came with (credentials, mode, cache, a `context` object…). */
  init: Record<string, unknown>;
  /** Values of the route's `:name` segments. */
  params: Record<string, string>;
  /** How many times this method + path has been asked for so far (1 the first time). */
  attempt: number;
  /** Milliseconds since the server started (or since `reset()`). */
  at: number;
}

export interface Reply {
  /** Default 200. */
  status?: number;
  statusText?: string;
  json?: unknown;
  text?: string;
  html?: string;
  body?: BodyInit | null;
  headers?: Record<string, string>;
  /** Extra wait before answering, on top of the server's latency. */
  delay?: number;
  /** Drop the connection instead of answering: fetch rejects with a TypeError. */
  network?: true;
  /** Send the body in this many pieces, `every` ms apart, so download progress is visible. */
  drip?: { chunks: number; every: number };
}

export type Route = (req: ServerRequest) => Reply | Promise<Reply>;
/** Keys are `'GET /posts/:id'`, `'/posts'` (any method) or `'*'`. First match wins. */
export type Routes = Record<string, Route>;

export type ServerEvent =
  | { type: 'request'; req: ServerRequest }
  | { type: 'response'; req: ServerRequest; status: number; statusText: string; ms: number }
  | { type: 'failed'; req: ServerRequest; reason: 'network' | 'aborted'; ms: number };

export interface ServerOptions {
  /** Milliseconds every answer takes. Default 300 (in the full view) or 250 (in a card). */
  latency?: number;
  /** Milliseconds between reading pieces of a streamed request body (upload progress). */
  readPace?: number;
  /** Record a `performance.measure` named after each URL, so the perfs addon has timings. */
  timings?: boolean;
}

export interface Server {
  /** Give this to `.fetchPolyfill()`. */
  fetch: (url: string, opts?: RequestInit | Request) => Promise<Response>;
  /** Listens to requests and answers; returns an unsubscribe. */
  on(fn: (e: ServerEvent) => void): () => void;
  readonly requests: readonly ServerRequest[];
  latency: number;
  /** Milliseconds since the server started (or since `reset()`), the clock `ServerRequest.at` uses. */
  now(): number;
  /** Forgets past requests and attempt counts, and restarts the clock. */
  reset(): void;
}

const STATUS_TEXT: Record<number, string> = {
  200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No Content', 301: 'Moved Permanently',
  302: 'Found', 304: 'Not Modified', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
  404: 'Not Found', 408: 'Request Timeout', 409: 'Conflict', 418: "I'm a teapot",
  422: 'Unprocessable Content', 429: 'Too Many Requests', 500: 'Internal Server Error',
  502: 'Bad Gateway', 503: 'Service Unavailable', 504: 'Gateway Timeout',
};

export const statusText = (status: number): string => STATUS_TEXT[status] ?? '';

interface Compiled {
  method: string | null;
  re: RegExp;
  names: string[];
  route: Route;
}

function compile(routes: Routes | Route): Compiled[] {
  if (typeof routes === 'function') return [{ method: null, re: /^/, names: [], route: routes }];
  return Object.entries(routes).map(([key, route]) => {
    const [a, b] = key.trim().split(/\s+/);
    const method = b ? a!.toUpperCase() : null;
    const pattern = (b ?? a)!;
    if (pattern === '*') return { method, re: /^/, names: [], route };
    const names: string[] = [];
    const src = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/:(\w+)/g, (_, n: string) => {
      names.push(n);
      return '([^/]+)';
    });
    return { method, re: new RegExp(`^${src}/?$`), names, route };
  });
}

const notFound: Route = (req) => ({ status: 404, json: { error: `Nothing at ${req.method} ${req.path}` } });

function dripStream(bytes: Uint8Array, chunks: number, every: number, signal: AbortSignal): ReadableStream<Uint8Array> {
  const size = Math.ceil(bytes.length / Math.max(1, chunks));
  let offset = 0;
  return new ReadableStream({
    async pull(controller) {
      if (offset >= bytes.length) return controller.close();
      if (offset > 0) await sleep(every, [signal]).catch((err: unknown) => controller.error(err));
      if (signal.aborted) return;
      controller.enqueue(bytes.slice(offset, offset + size));
      offset += size;
    },
  });
}

function buildResponse(url: string, method: string, reply: Reply, signal: AbortSignal): Response {
  const status = reply.status ?? 200;
  const headers = new Headers(reply.headers);
  let body: BodyInit | null = reply.body ?? null;
  if (reply.json !== undefined) {
    body = JSON.stringify(reply.json);
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
  } else if (reply.html !== undefined) {
    body = reply.html;
    if (!headers.has('content-type')) headers.set('content-type', 'text/html; charset=utf-8');
  } else if (reply.text !== undefined) {
    body = reply.text;
    if (!headers.has('content-type')) headers.set('content-type', 'text/plain; charset=utf-8');
  }
  if (method === 'HEAD' || [204, 205, 304].includes(status)) body = null;
  if (reply.drip && typeof body === 'string') {
    const bytes = new TextEncoder().encode(body);
    headers.set('content-length', String(bytes.length));
    body = dripStream(bytes, reply.drip.chunks, reply.drip.every, signal);
  }
  const res = new Response(body, { status, statusText: reply.statusText ?? statusText(status), headers });
  // A constructed Response has an empty url; a real one carries the address it came from.
  Object.defineProperty(res, 'url', { value: url });
  return res;
}

/** Starts a server for one mount. It stops answering, and aborts what is in flight, on dispose. */
export function createServer(stage: Stage, routes: Routes | Route, opts: ServerOptions = {}): Server {
  const table = compile(routes);
  const listeners = new Set<(e: ServerEvent) => void>();
  const requests: ServerRequest[] = [];
  const attempts = new Map<string, number>();
  let t0 = performance.now();
  let nextId = 1;
  const emit = (e: ServerEvent): void => listeners.forEach((fn) => fn(e));

  const match = (method: string, path: string): { route: Route; params: Record<string, string> } => {
    for (const c of table) {
      if (c.method && c.method !== method) continue;
      const m = c.re.exec(path);
      if (!m) continue;
      const params: Record<string, string> = {};
      c.names.forEach((n, i) => (params[n] = decodeURIComponent(m[i + 1]!)));
      return { route: c.route, params };
    }
    return { route: notFound, params: {} };
  };

  const server: Server = {
    latency: opts.latency ?? (stage.preview ? 250 : 300),
    get requests() {
      return requests;
    },
    now: () => performance.now() - t0,
    on(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    reset() {
      requests.length = 0;
      attempts.clear();
      nextId = 1;
      t0 = performance.now();
    },
    async fetch(url, init = {}) {
      if (stage.disposed) throw new DOMException('The example was closed', 'AbortError');
      const parsed = new URL(url, BASE);
      // Real fetch refuses URLs with credentials in them; the basicAuth addon moves them out first.
      if (parsed.username || parsed.password) {
        throw new TypeError(`Request cannot be constructed from a URL that includes credentials: ${url}`);
      }
      const isRequest = init instanceof Request;
      const method = (init.method ?? 'GET').toUpperCase();
      const signal = init.signal ?? null;
      const started = performance.now();
      const headerList: [string, string][] = isRequest
        ? [...init.headers.entries()]
        : init.headers instanceof Headers
          ? [...init.headers.entries()]
          : Array.isArray(init.headers)
            ? init.headers.map(([k, v]) => [k, v] as [string, string])
            : Object.entries(init.headers ?? {}).map(([k, v]) => [k, String(v)] as [string, string]);
      const headers = new Headers();
      headerList.forEach(([k, v]) => headers.append(k, v));
      const body = await readBody(isRequest ? init : init.body, headers, headerList, opts.readPace ?? 0, [signal, stage.signal]);
      const extra: Record<string, unknown> = {};
      if (isRequest) {
        for (const k of ['credentials', 'mode', 'cache', 'redirect'] as const) extra[k] = init[k];
      } else {
        for (const [k, v] of Object.entries(init)) {
          if (!['method', 'headers', 'body', 'signal', 'duplex'].includes(k)) extra[k] = v;
        }
      }
      const key = `${method} ${parsed.pathname}`;
      const attempt = (attempts.get(key) ?? 0) + 1;
      attempts.set(key, attempt);
      const { route, params } = match(method, parsed.pathname);
      const req: ServerRequest = {
        id: nextId++, method, url: parsed.href, path: parsed.pathname, query: parsed.searchParams,
        headers, headerList, body, init: extra, params, attempt, at: started - t0,
      };
      requests.push(req);
      emit({ type: 'request', req });
      try {
        const reply = await route(req);
        await sleep(server.latency + (reply.delay ?? 0), [signal, stage.signal]);
        if (reply.network) {
          emit({ type: 'failed', req, reason: 'network', ms: performance.now() - started });
          throw new TypeError('Failed to fetch');
        }
        const res = buildResponse(parsed.href, method, reply, stage.signal);
        if (opts.timings) performance.measure(url, { start: started, end: performance.now() });
        emit({ type: 'response', req, status: res.status, statusText: res.statusText, ms: performance.now() - started });
        return res;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError' && !stage.disposed) {
          emit({ type: 'failed', req, reason: 'aborted', ms: performance.now() - started });
        }
        throw err;
      }
    },
  };
  stage.onDispose(() => listeners.clear());
  return server;
}
