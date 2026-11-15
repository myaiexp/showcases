// Log text lines and scripted mouse events for the signal and event examples
import type { Mark, View } from 'vega';

/** A text mark showing a signal expression, one line of a readout (monospace, top-left anchored). */
export function line(expr: string, y: number, extra: Record<string, unknown> = {}, x = 6): Mark {
  return {
    type: 'text',
    interactive: false,
    encode: {
      enter: { baseline: { value: 'top' }, font: { value: 'monospace' }, fontSize: { value: 13 }, fill: { value: '#ddd' } },
      update: { x: { value: x }, y: { value: y }, text: { signal: expr }, ...extra },
    },
  } as Mark;
}

/**
 * Dispatches a mouse event on the view's canvas at data-rectangle pixels, with extra init such as
 * shiftKey or ctrlKey. The Ghost covers plain pointer gestures; this covers modifier keys.
 */
export function fire(view: View, type: string, x: number, y: number, init: MouseEventInit = {}): void {
  const el = view.container()?.querySelector('canvas');
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const sx = el.offsetWidth ? rect.width / el.offsetWidth : 1;
  const sy = el.offsetHeight ? rect.height / el.offsetHeight : 1;
  const [ox, oy] = view.origin();
  el.dispatchEvent(
    new MouseEvent(type, {
      clientX: rect.left + (x + ox) * sx,
      clientY: rect.top + (y + oy) * sy,
      bubbles: true,
      cancelable: true,
      view: window,
      ...init,
    }),
  );
}

export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
