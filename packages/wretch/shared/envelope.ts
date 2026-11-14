// What reached the server: method, address, query, headers, body; changes flash
import type { RequestBody } from './server-body.ts';
import type { Server, ServerRequest } from './server.ts';
import type { Stage } from './stage.ts';
import './envelope.css';

export interface EnvelopeOptions {
  parent?: HTMLElement;
  /** Title above it. Default "What the server received". */
  title?: string;
  /** Header names to show, lowercase. Default: all of them. */
  headers?: string[];
  /** Hide the body section. */
  noBody?: boolean;
}

export interface Envelope {
  el: HTMLElement;
  /** Shows one request; parts that differ from the previous one flash. */
  show(req: ServerRequest | null): void;
  /** Shows every request `server` receives, until the stage is disposed. */
  follow(server: Server): void;
}

const div = (cls: string, text = ''): HTMLDivElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

/** JSON on several lines, or a short value as is. */
export function pretty(value: unknown): string {
  const one = JSON.stringify(value);
  return one && one.length <= 40 ? one : JSON.stringify(value, null, 2);
}

/** A body as lines of text, one entry per line for forms. */
export function bodyLines(body: RequestBody): string[] {
  switch (body.kind) {
    case 'none':
      return [];
    case 'json':
      return pretty(body.value).split('\n');
    case 'text':
      return body.text.split('\n');
    case 'urlencoded':
      return [body.text];
    case 'form':
      return body.entries.map(([k, v]) => (typeof v === 'string' ? `${k} = ${v}` : `${k} = 📄 ${v.file} (${v.size} bytes)`));
    case 'binary':
      return [`${body.size} bytes of ${body.type || 'binary data'}`];
  }
}

const BODY_NAME: Record<RequestBody['kind'], string> = {
  none: '',
  json: 'JSON',
  text: 'text',
  urlencoded: 'form, URL-encoded',
  form: 'form, multipart',
  binary: 'bytes',
};

export function envelope(stage: Stage, opts: EnvelopeOptions = {}): Envelope {
  const el = div('wr-env');
  const title = div('wr-env-title', opts.title ?? 'What the server received');
  const line = div('wr-env-line');
  const sections = div('wr-env-sections');
  el.append(title, line, sections);
  (opts.parent ?? stage.root).append(el);
  let before = new Map<string, string>();

  const section = (name: string, rows: [string, string][]): void => {
    if (!rows.length) return;
    const box = div('wr-env-sec');
    box.append(div('wr-env-sec-name', name));
    for (const [k, v] of rows) {
      const row = div('wr-env-kv');
      const key = `${name}|${k}`;
      row.append(div('wr-env-k', k), div('wr-env-v', v));
      if (before.size && before.get(key) !== v) {
        row.animate([{ background: 'var(--accent-bg)' }, { background: 'transparent' }], { duration: 1400, easing: 'ease-out' });
      }
      box.append(row);
      now.set(key, v);
    }
    sections.append(box);
  };
  let now = new Map<string, string>();

  const show = (req: ServerRequest | null): void => {
    sections.replaceChildren();
    now = new Map();
    if (!req) {
      line.textContent = 'Nothing sent yet';
      line.className = 'wr-env-line wr-dim';
      return;
    }
    line.className = 'wr-env-line';
    const method = div('wr-env-method', req.method);
    const addr = div('wr-env-addr', req.url.replace(/\?.*$/, ''));
    line.replaceChildren(method, addr);
    const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    if (q) line.append(div('wr-env-q', q));
    section('query', [...req.query.entries()]);
    const shown = opts.headers;
    section(
      'headers',
      req.headerList.filter(([k]) => !shown || shown.includes(k.toLowerCase())),
    );
    if (!opts.noBody && req.body.kind !== 'none') {
      const b = req.body;
      const rows: [string, string][] =
        b.kind === 'form'
          ? b.entries.map(([k, v]) => [k, typeof v === 'string' ? v : `📄 ${v.file} (${v.size} bytes)`])
          : b.kind === 'urlencoded'
            ? b.entries
            : [['', bodyLines(b).join('\n')]];
      section(`body · ${BODY_NAME[b.kind]}`, rows);
    }
    before = now;
  };

  show(null);
  return {
    el,
    show,
    follow(server) {
      const off = server.on((e) => {
        if (e.type === 'request') show(e.req);
      });
      stage.onDispose(off);
    },
  };
}
