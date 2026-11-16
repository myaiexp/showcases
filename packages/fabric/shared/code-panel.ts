// Text and SVG-picture panels that take over a stage pane beside a canvas
import type { Pane, Stage } from './stage.ts';
import { status } from './status.ts';

const BASE = 'position:absolute;inset:0;margin:0;box-sizing:border-box;';

/** Replaces a pane's canvas with a scrolling <pre>; returns the setter for its text. */
export function codePanel(pane: Pane, preview: boolean): (text: string) => void {
  pane.el.style.display = 'none';
  const pre = document.createElement('pre');
  pre.style.cssText = `${BASE}padding:${preview ? 4 : 8}px;overflow:${preview ? 'hidden' : 'auto'};
    font:${preview ? 7 : 12}px/1.35 ui-monospace,monospace;color:#2b2a33;white-space:${preview ? 'pre' : 'pre-wrap'};
    overflow-wrap:anywhere;tab-size:2;background:#fffdf7`;
  pane.frame.append(pre);
  return (text) => {
    if (pre.textContent !== text) pre.textContent = text;
  };
}

/** Replaces a pane's canvas with an <img> that draws an SVG string; returns the setter. */
export function svgPanel(pane: Pane, background = '#fff7d6'): (svg: string) => void {
  pane.el.style.display = 'none';
  const img = document.createElement('img');
  img.style.cssText = `${BASE}width:100%;height:100%;object-fit:contain;background:${background}`;
  img.alt = 'the SVG, drawn by the browser';
  pane.frame.append(img);
  return (svg) => {
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };
}

/** JSON with a small indent (1 space in cards, 2 in the full view); arrays of plain values stay on one line. */
export function pretty(value: unknown, preview: boolean): string {
  return JSON.stringify(value, null, preview ? 1 : 2).replace(
    /\[([^[\]{}]*)\]/g,
    (_m, inner: string) => `[${inner.replace(/\s*\n\s*/g, ' ').trim()}]`,
  );
}

/** SVG markup with line breaks between elements, so a long string reads as lines. */
export function breakSvg(svg: string): string {
  return svg.replace(/></g, '>\n<');
}

/** `status()` for narrow panes: a card shows only the first 24 characters of the first line. */
export function briefStatus(stage: Stage, pane: Pane = stage): (text: string) => void {
  const set = status(stage, '', pane);
  return stage.preview ? (text) => set((text.split('\n')[0] ?? '').slice(0, 24)) : set;
}

/** A labelled one-line text input for the control bar. */
export function textField(bar: HTMLElement, label: string, value: string, onInput: (v: string) => void): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.cssText = 'display:flex;gap:6px;align-items:center;font-size:13px';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.style.cssText = 'width:120px';
  input.addEventListener('input', () => onInput(input.value));
  wrap.append(label, input);
  bar.append(wrap);
  return input;
}
