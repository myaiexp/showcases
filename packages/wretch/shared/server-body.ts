// Reads a request body the way a server would: JSON, text, form fields or bytes
import { sleep } from './sleep.ts';

/** A file field, described rather than kept. */
export interface FilePart {
  file: string;
  size: number;
  type: string;
}

export type RequestBody =
  | { kind: 'none' }
  | { kind: 'json'; text: string; value: unknown }
  | { kind: 'text'; text: string; type: string }
  /** multipart/form-data: what FormData sends */
  | { kind: 'form'; entries: [string, string | FilePart][] }
  /** application/x-www-form-urlencoded: what an HTML form sends */
  | { kind: 'urlencoded'; text: string; entries: [string, string][] }
  | { kind: 'binary'; size: number; type: string };

type Signals = (AbortSignal | null | undefined)[];

const contentType = (headers: Headers): string => headers.get('content-type') ?? '';

/** Adds a header fetch would add itself, so the request shows it like a real one would. */
function addDefault(headers: Headers, list: [string, string][], name: string, value: string): void {
  if (headers.has(name)) return;
  headers.set(name, value);
  list.push([name, value]);
}

function fromText(text: string, type: string): RequestBody {
  if (/json/.test(type)) {
    try {
      return { kind: 'json', text, value: JSON.parse(text) as unknown };
    } catch {
      return { kind: 'text', text, type };
    }
  }
  if (/x-www-form-urlencoded/.test(type)) {
    return { kind: 'urlencoded', text, entries: [...new URLSearchParams(text).entries()] };
  }
  return { kind: 'text', text, type };
}

function fromForm(form: FormData): RequestBody {
  const entries: [string, string | FilePart][] = [];
  form.forEach((v, k) => entries.push([k, typeof v === 'string' ? v : { file: v.name, size: v.size, type: v.type }]));
  return { kind: 'form', entries };
}

/** Reads a stream piece by piece, `pace` ms apart, so upload progress has time to show. */
async function drain(stream: ReadableStream<Uint8Array>, pace: number, signals: Signals): Promise<Uint8Array<ArrayBuffer>> {
  const reader = stream.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    size += value.length;
    if (pace > 0) await sleep(pace, signals);
  }
  const out = new Uint8Array(size);
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}

async function fromBytes(bytes: Uint8Array<ArrayBuffer>, type: string): Promise<RequestBody> {
  if (/multipart\/form-data/.test(type)) {
    return fromForm(await new Response(bytes, { headers: { 'content-type': type } }).formData());
  }
  if (/json|text|urlencoded|xml/.test(type)) return fromText(new TextDecoder().decode(bytes), type);
  return { kind: 'binary', size: bytes.length, type };
}

/**
 * Turns what wretch handed to fetch into a readable body. `headers` and `list` gain the
 * content type fetch would add for FormData and URLSearchParams.
 */
export async function readBody(
  source: BodyInit | Request | null | undefined,
  headers: Headers,
  list: [string, string][],
  pace: number,
  signals: Signals,
): Promise<RequestBody> {
  if (source instanceof Request) {
    if (!source.body) return { kind: 'none' };
    return fromBytes(await drain(source.body, pace, signals), contentType(headers));
  }
  if (source == null) return { kind: 'none' };
  if (typeof source === 'string') return fromText(source, contentType(headers));
  if (source instanceof FormData) {
    addDefault(headers, list, 'content-type', 'multipart/form-data; boundary=----formdata-7d3f');
    return fromForm(source);
  }
  if (source instanceof URLSearchParams) {
    addDefault(headers, list, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    const text = source.toString();
    return { kind: 'urlencoded', text, entries: [...source.entries()] };
  }
  if (source instanceof Blob) return { kind: 'binary', size: source.size, type: source.type || contentType(headers) };
  if (source instanceof ReadableStream) return fromBytes(await drain(source, pace, signals), contentType(headers));
  if (source instanceof ArrayBuffer || ArrayBuffer.isView(source)) {
    return { kind: 'binary', size: source.byteLength, type: contentType(headers) };
  }
  return { kind: 'text', text: String(source), type: contentType(headers) };
}
