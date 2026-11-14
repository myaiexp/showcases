// A titled box of text lines (results, console, raw answers) and a grid of boxes
import type { Tone } from './wire.ts';
import './pane.css';

export interface Pane {
  el: HTMLElement;
  /** The title row; its text can be changed. */
  head: HTMLElement;
  body: HTMLElement;
  /** Replaces everything with one line. */
  set(text: string, tone?: Tone): HTMLElement;
  /** Appends a line (it fades in) and returns it. */
  add(text: string, tone?: Tone): HTMLElement;
  clear(): void;
}

/** A two-column grid for panes; four children make a 2 x 2 square. */
export function grid(parent: HTMLElement): HTMLElement {
  const g = document.createElement('div');
  g.className = 'wr-grid';
  parent.append(g);
  return g;
}

export function pane(parent: HTMLElement, title: string): Pane {
  const el = document.createElement('div');
  el.className = 'wr-pane';
  const head = document.createElement('div');
  head.className = 'wr-pane-head';
  head.textContent = title;
  const body = document.createElement('div');
  body.className = 'wr-pane-body';
  el.append(head, body);
  parent.append(el);
  const add = (text: string, tone?: Tone): HTMLElement => {
    const line = document.createElement('div');
    line.className = tone ? `wr-line wr-${tone}` : 'wr-line';
    line.textContent = text;
    body.append(line);
    line.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
    return line;
  };
  return {
    el,
    head,
    body,
    add,
    set(text, tone) {
      body.replaceChildren();
      return add(text, tone);
    },
    clear: () => body.replaceChildren(),
  };
}
