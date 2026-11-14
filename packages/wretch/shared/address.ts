// An address bar that shows the path and each query piece, new pieces flashing
import type { Tone } from './wire.ts';
import './address.css';

export interface Address {
  el: HTMLElement;
  /** Shows `url`; query pieces that were not in the previous one flash. */
  set(url: string, tone?: Tone): void;
}

const div = (cls: string, text = ''): HTMLDivElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

/** A titled bar with the address the server received. */
export function address(parent: HTMLElement, title = 'Address the request went to'): Address {
  const el = div('wr-addr');
  const line = div('wr-addr-line');
  el.append(div('wr-addr-title', title), line);
  parent.append(el);
  let before = new Set<string>();
  return {
    el,
    set(url, tone) {
      const q = url.indexOf('?');
      const path = (q < 0 ? url : url.slice(0, q)).replace('https://', '');
      line.replaceChildren(div('wr-addr-path', path));
      const pieces = q < 0 ? [] : url.slice(q + 1).split('&').filter(Boolean);
      const now = new Set<string>();
      pieces.forEach((piece, i) => {
        const span = div('wr-addr-piece', piece);
        line.append(div('wr-addr-sep', i === 0 ? '?' : '&'), span);
        now.add(piece);
        if (before.size && !before.has(piece)) {
          span.animate([{ background: 'var(--accent-bg)' }, { background: 'transparent' }], { duration: 1400, easing: 'ease-out' });
        }
      });
      if (!pieces.length && q >= 0) line.append(div('wr-addr-sep', '?'));
      line.className = tone ? `wr-addr-line wr-${tone}` : 'wr-addr-line';
      before = now;
    },
  };
}
