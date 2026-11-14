// A pretend web server at https://data.example that answers XMLHttpRequest
//
// Papa Parse downloads remote files with XMLHttpRequest. Cards must not touch the network,
// so while a fake server is alive, XMLHttpRequest is a subclass that answers requests for
// its URLs itself (with Range support, a delay, status codes) and passes every other URL
// to the real one. The class goes back to the browser's own once the last server is gone.

export interface ServedFile {
  body: string;
  /** HTTP status to answer with. Default 200 (206 for a Range request). */
  status?: number;
  /** Delay before each answer, in ms. Default 120. */
  delay?: number;
  /** Extra response headers. */
  headers?: Record<string, string>;
}

export interface RequestRecord {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: unknown;
  withCredentials: boolean;
  timeout: number;
  /** Filled in when the answer is sent. */
  status?: number;
  bytes?: number;
  outcome?: 'answered' | 'timed out' | 'aborted';
}

export interface FakeServer {
  /** The full URL a path is served at. */
  url(path: string): string;
  /** Adds or replaces a file. */
  serve(path: string, file: ServedFile): void;
  /** Every request so far, oldest first. */
  requests: RequestRecord[];
  /** Called when a request arrives and again when it is answered. */
  onRequest(fn: (r: RequestRecord) => void): void;
  dispose(): void;
}

const files = new Map<string, { file: ServedFile; server: Server }>();
const hosts = new Set<string>();
const Native = window.XMLHttpRequest;
/** The answer state of each request a fake server is handling. */
const fakes = new WeakMap<XMLHttpRequest, Pending>();

interface Server {
  notify(r: RequestRecord): void;
  timers: Set<ReturnType<typeof setTimeout>>;
}

class Pending {
  readyState = 0;
  status = 0;
  statusText = '';
  responseText = '';
  responseHeaders: Record<string, string> = {};
  timer: ReturnType<typeof setTimeout> | undefined;
  headers: Record<string, string> = {};
  readonly entry: { file: ServedFile; server: Server };
  readonly record: RequestRecord;
  constructor(entry: { file: ServedFile; server: Server }, record: RequestRecord) {
    this.entry = entry;
    this.record = record;
  }
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

class FakeAwareXHR extends Native {
  override open(method: string, url: string | URL, async = true, user?: string | null, pass?: string | null): void {
    const entry = files.get(String(url));
    if (!entry) {
      fakes.delete(this);
      super.open(method, url, async, user, pass);
      return;
    }
    const record: RequestRecord = { method, url: String(url), headers: {}, body: undefined, withCredentials: false, timeout: 0 };
    const p = new Pending(entry, record);
    p.headers = record.headers;
    p.readyState = 1;
    fakes.set(this, p);
  }
  override setRequestHeader(name: string, value: string): void {
    const p = fakes.get(this);
    if (p) p.headers[name] = value;
    else super.setRequestHeader(name, value);
  }
  override send(body?: Document | XMLHttpRequestBodyInit | null): void {
    const p = fakes.get(this);
    if (!p) {
      super.send(body);
      return;
    }
    const { file, server } = p.entry;
    Object.assign(p.record, { body, withCredentials: this.withCredentials, timeout: this.timeout });
    server.notify(p.record);
    const delay = file.delay ?? 120;
    const finish = (fn: () => void, ms: number): void => {
      p.timer = setTimeout(() => {
        server.timers.delete(p.timer!);
        fn();
        server.notify(p.record);
      }, ms);
      server.timers.add(p.timer);
    };
    if (this.timeout > 0 && delay > this.timeout) {
      finish(() => {
        p.readyState = 4;
        p.record.outcome = 'timed out';
        this.dispatchEvent(new ProgressEvent('timeout'));
      }, this.timeout);
      return;
    }
    finish(() => answer(this, p), delay);
  }
  override abort(): void {
    const p = fakes.get(this);
    if (!p) {
      super.abort();
      return;
    }
    clearTimeout(p.timer);
    p.readyState = 0;
    p.record.outcome = 'aborted';
  }
  override getResponseHeader(name: string): string | null {
    const p = fakes.get(this);
    if (!p) return super.getResponseHeader(name);
    const key = Object.keys(p.responseHeaders).find((k) => k.toLowerCase() === name.toLowerCase());
    return key ? p.responseHeaders[key]! : null;
  }
}

// readyState, status, statusText, responseText and response are accessors on the native
// prototype; a class cannot override them as accessors in TypeScript, so they are
// redefined here: a faked request reads its Pending state, any other the native getter.
for (const key of ['readyState', 'status', 'statusText', 'responseText', 'response'] as const) {
  const native = Object.getOwnPropertyDescriptor(Native.prototype, key)!;
  Object.defineProperty(FakeAwareXHR.prototype, key, {
    configurable: true,
    get(this: XMLHttpRequest) {
      const p = fakes.get(this);
      if (!p) return native.get!.call(this);
      return key === 'response' ? p.responseText : p[key];
    },
  });
}

function answer(xhr: XMLHttpRequest, p: Pending): void {
  const { file } = p.entry;
  const bytes = encoder.encode(file.body);
  let status = file.status ?? 200;
  let part = bytes;
  const range = /bytes=(\d+)-(\d+)?/.exec(p.headers['Range'] ?? '');
  p.responseHeaders = { 'Content-Type': 'text/csv', ...file.headers };
  if (range && status === 200) {
    const start = Number(range[1]);
    const end = Math.min(range[2] ? Number(range[2]) : bytes.length - 1, bytes.length - 1);
    part = bytes.slice(start, end + 1);
    status = 206;
    p.responseHeaders['Content-Range'] = `bytes ${start}-${end}/${bytes.length}`;
  }
  p.status = status;
  p.statusText = STATUS_TEXT[status] ?? `HTTP ${status}`;
  p.responseText = status < 400 ? decoder.decode(part) : '';
  p.readyState = 4;
  Object.assign(p.record, { status, bytes: part.length, outcome: 'answered' });
  // Papa listens with onload and onerror; an HTTP error still arrives as load, as in a browser.
  xhr.dispatchEvent(new ProgressEvent('readystatechange'));
  xhr.dispatchEvent(new ProgressEvent('load'));
  xhr.dispatchEvent(new ProgressEvent('loadend'));
}

const STATUS_TEXT: Record<number, string> = { 200: 'OK', 206: 'Partial Content', 403: 'Forbidden', 404: 'Not Found', 500: 'Internal Server Error' };

export function fakeServer(initial: Record<string, ServedFile> = {}): FakeServer {
  // Each live server gets its own host, so two examples on one page never share a URL.
  let n = 1;
  while (hosts.has(n === 1 ? 'data.example' : `data${n}.example`)) n++;
  const name = n === 1 ? 'data.example' : `data${n}.example`;
  hosts.add(name);
  const host = `https://${name}`;
  const mine = new Set<string>();
  const listeners: ((r: RequestRecord) => void)[] = [];
  const self: Server = { notify: (r) => listeners.forEach((fn) => fn(r)), timers: new Set() };
  if (hosts.size === 1) window.XMLHttpRequest = FakeAwareXHR;
  let disposed = false;

  const server: FakeServer = {
    url: (path) => `${host}/${path.replace(/^\//, '')}`,
    serve(path, file) {
      const u = server.url(path);
      mine.add(u);
      files.set(u, { file, server: self });
    },
    requests: [],
    onRequest(fn) {
      listeners.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const t of self.timers) clearTimeout(t);
      for (const u of mine) files.delete(u);
      listeners.length = 0;
      hosts.delete(name);
      if (hosts.size === 0) window.XMLHttpRequest = Native;
    },
  };
  listeners.push((r) => {
    if (!server.requests.includes(r)) server.requests.push(r);
  });
  for (const [path, file] of Object.entries(initial)) server.serve(path, file);
  return server;
}
