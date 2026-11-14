// Requests fly to the server as pills, answers fly back, and a log lists them
import type { Server, ServerEvent, ServerRequest } from './server.ts';
import type { Stage } from './stage.ts';

export interface WireOptions {
  /** Where to put it. Default: the stage's scene. */
  parent?: HTMLElement;
  /** Rows the request log keeps; 0 hides it. Default 3 in a card, 8 in the full view. */
  rows?: number;
  /** Show the query string in pills and rows. Default true. */
  query?: boolean;
  /** Left and right labels. Default "Your app" and "api.example" ("app" and "server" in a card). */
  app?: string;
  server?: string;
}

export interface Wire {
  el: HTMLElement;
  /** Adds a line to the log that is not a request, such as "the app shows: Post not found". */
  note(text: string, tone?: Tone): void;
  /** Empties the log. */
  clear(): void;
}

export type Tone = 'ok' | 'warn' | 'bad' | 'info' | 'dim';

/** The colour family of a status code. */
export function statusTone(status: number): Tone {
  if (status < 300) return 'ok';
  if (status < 400) return 'info';
  if (status < 500) return 'warn';
  return 'bad';
}

const div = (cls: string, text = ''): HTMLDivElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

/** Draws the wire and follows `server` until the stage is disposed. */
export function wire(stage: Stage, server: Server, opts: WireOptions = {}): Wire {
  const maxRows = opts.rows ?? (stage.preview ? 3 : 8);
  const showQuery = opts.query ?? true;
  const el = div('wr-wire');
  const lane = div('wr-lane');
  const app = div('wr-end wr-app', opts.app ?? (stage.preview ? 'app' : 'Your app'));
  const host = div('wr-end wr-host', opts.server ?? (stage.preview ? 'server' : 'api.example'));
  const track = div('wr-track');
  lane.append(app, track, host);
  const log = div('wr-log');
  el.append(lane);
  if (maxRows > 0) el.append(log);
  (opts.parent ?? stage.root).append(el);

  const rows = new Map<number, HTMLElement>();
  const target = (req: ServerRequest): string => req.path + (showQuery && req.url.includes('?') ? '?' + req.query.toString() : '');

  const addRow = (row: HTMLElement): void => {
    log.append(row);
    while (log.children.length > maxRows) log.firstElementChild?.remove();
    row.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 200 });
  };

  /** Sends a pill along the track; `back` flies right to left. */
  const fly = (text: string, tone: Tone, back: boolean, slot: number, ms: number, drop = false): void => {
    if (stage.disposed) return;
    const pill = div(`wr-pill wr-${tone}`, text);
    pill.style.top = `${4 + (slot % 3) * 16}px`;
    track.append(pill);
    const from = back ? 'calc(100% - var(--w))' : '0px';
    const to = back ? '0px' : 'calc(100% - var(--w))';
    const w = pill.offsetWidth;
    pill.style.setProperty('--w', `${w}px`);
    const frames: Keyframe[] = drop
      ? [{ left: '0px', opacity: 1 }, { left: `calc(50% - ${w / 2}px)`, opacity: 1, offset: 0.6 }, { left: `calc(50% - ${w / 2}px)`, opacity: 0, transform: 'translateY(14px)' }]
      : [{ left: from, opacity: 0.4 }, { left: to, opacity: 1 }];
    const anim = pill.animate(frames, { duration: ms, easing: 'ease-in-out', fill: 'forwards' });
    anim.finished
      .then(() => stage.after(drop ? 0 : 500, () => pill.remove()))
      .catch(() => pill.remove());
    if (!back && !drop) host.animate([{ boxShadow: '0 0 0 0 var(--accent)' }, { boxShadow: '0 0 0 4px transparent' }], { duration: 500, delay: ms });
  };

  const onEvent = (e: ServerEvent): void => {
    const { req } = e;
    const travel = Math.max(120, Math.min(server.latency * 0.8, 450));
    if (e.type === 'request') {
      fly(`${req.method} ${target(req)}`, 'dim', false, req.id, travel);
      const row = div('wr-row wr-dim');
      row.append(div('wr-row-id', `#${req.id}`), div('wr-row-req', `${req.method} ${target(req)}`), div('wr-row-res', '…'));
      rows.set(req.id, row);
      addRow(row);
      return;
    }
    const row = rows.get(req.id);
    const res = row?.querySelector('.wr-row-res');
    if (e.type === 'response') {
      const tone = statusTone(e.status);
      fly(`${e.status} ${e.statusText}`.trim(), tone, true, req.id, travel);
      if (row && res) {
        row.className = `wr-row wr-${tone}`;
        res.textContent = `${e.status} ${e.statusText} · ${Math.round(e.ms)} ms`;
      }
    } else {
      const text = e.reason === 'network' ? 'connection lost' : 'aborted';
      fly(text, e.reason === 'network' ? 'bad' : 'dim', false, req.id, travel, true);
      if (row && res) {
        row.className = `wr-row ${e.reason === 'network' ? 'wr-bad' : 'wr-dim'}`;
        res.textContent = `✕ ${text} · ${Math.round(e.ms)} ms`;
      }
    }
  };
  const off = server.on(onEvent);
  stage.onDispose(off);

  return {
    el,
    note(text, tone = 'info') {
      if (maxRows === 0 || stage.disposed) return;
      const row = div(`wr-row wr-note wr-${tone}`);
      row.append(div('wr-row-id', '↳'), div('wr-row-req', text));
      addRow(row);
    },
    clear() {
      log.replaceChildren();
      rows.clear();
    },
  };
}
