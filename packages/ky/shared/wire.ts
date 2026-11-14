// The page-to-server picture: requests and answers travel as labelled packets
import type { Seen, Server, ServerEvent } from './server.ts';

export interface WireOptions {
  /** Left box label. Default 'your page'. */
  client?: string;
  /** Right box label; by default the host of the latest request. */
  host?: string;
  /** Text on a request packet. Default: method and path. */
  label?: (req: Seen) => string;
}

export interface Wire {
  el: HTMLElement;
  /** Puts a short note on the server box, such as 'cache hit'. */
  note(text: string, tone?: 'ok' | 'bad' | 'warn' | 'info'): void;
  dispose(): void;
}

const TONE_OF = (status: number): string => (status < 300 ? 'ok' : status < 400 ? 'info' : status < 500 ? 'warn' : 'bad');

export function pathOf(url: URL): string {
  return decodeURIComponent(url.pathname + url.search);
}

export function wire(parent: HTMLElement, server: Server, opts: WireOptions = {}): Wire {
  const el = document.createElement('div');
  el.className = 'ky-wire';
  const client = document.createElement('div');
  client.className = 'ky-node ky-client';
  client.textContent = opts.client ?? 'your page';
  const lane = document.createElement('div');
  lane.className = 'ky-lane';
  const box = document.createElement('div');
  box.className = 'ky-node ky-server';
  const host = document.createElement('span');
  host.className = 'ky-host';
  host.textContent = opts.host ?? 'server';
  const tag = document.createElement('span');
  tag.className = 'ky-server-note';
  box.append(host, tag);
  el.append(client, lane, box);
  parent.append(el);

  const inFlight = new Map<number, HTMLElement>();
  let busy = 0;
  let pulse: Animation | null = null;
  const label = opts.label ?? ((r: Seen) => `${r.method} ${pathOf(r.url)}`);

  const setBusy = (delta: number): void => {
    busy = Math.max(0, busy + delta);
    if (busy && !pulse) {
      pulse = box.animate([{ opacity: 1 }, { opacity: 0.55 }, { opacity: 1 }], { duration: 700, iterations: Infinity });
    } else if (!busy && pulse) {
      pulse.cancel();
      pulse = null;
    }
  };

  const packet = (req: Seen, text: string, tone: string): HTMLElement => {
    const p = document.createElement('div');
    p.className = 'ky-packet';
    p.dataset['tone'] = tone;
    p.dataset['row'] = String(req.id % 2);
    p.textContent = text;
    lane.append(p);
    return p;
  };
  const travel = (p: HTMLElement, from: number, to: number, ms: number): Animation => {
    const span = Math.max(0, lane.clientWidth - p.offsetWidth);
    return p.animate([{ transform: `translateX(${from * span}px)` }, { transform: `translateX(${to * span}px)` }], {
      duration: ms,
      fill: 'forwards',
      easing: 'ease-in-out',
    });
  };
  const fade = (p: HTMLElement, delay = 500): void => {
    p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, delay, fill: 'forwards' }).onfinish = () => p.remove();
  };
  const fail = (req: Seen, text: string): void => {
    const p = inFlight.get(req.id) ?? packet(req, '', 'bad');
    inFlight.delete(req.id);
    p.dataset['tone'] = 'bad';
    p.textContent = text;
    fade(p, 700);
  };

  const onEvent = (e: ServerEvent): void => {
    const { req } = e;
    if (e.kind === 'send') {
      if (!opts.host) host.textContent = req.url.host;
      const p = packet(req, label(req), 'req');
      inFlight.set(req.id, p);
      travel(p, 0, 1, server.latency);
    } else if (e.kind === 'arrive') {
      setBusy(1);
      inFlight.get(req.id)?.classList.add('ky-at-server');
    } else if (e.kind === 'reply') {
      setBusy(-1);
      inFlight.get(req.id)?.remove();
      const p = packet(req, `${e.status}`, TONE_OF(e.status));
      inFlight.set(req.id, p);
      travel(p, 1, 0, server.latency).onfinish = () => {
        if (inFlight.get(req.id) === p) inFlight.delete(req.id);
        fade(p);
      };
    } else if (e.kind === 'drop') {
      setBusy(-1);
      fail(req, '✕ connection lost');
    } else if (e.kind === 'abort') {
      if (inFlight.get(req.id)?.classList.contains('ky-at-server')) setBusy(-1);
      fail(req, '✕ cancelled');
    }
  };
  const off = server.on(onEvent);

  return {
    el,
    note(text, tone = 'info') {
      tag.textContent = text;
      tag.dataset['tone'] = tone;
    },
    dispose() {
      off();
      pulse?.cancel();
      for (const a of el.getAnimations({ subtree: true })) a.cancel();
      el.remove();
    },
  };
}
