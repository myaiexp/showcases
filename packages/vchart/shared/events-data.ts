// Event log, sample rows and code-fired clicks for the Events examples
import type { IVChart } from './chart.ts';

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const salesRows = DAYS.flatMap((day, i) => [
  { day, team: 'north', sales: 14 + ((i * 7) % 20) },
  { day, team: 'south', sales: 20 + ((i * 11) % 18) },
]);

/**
 * A scrolling text log keeping the last `max` lines. Newest on top by default; pass
 * `newestFirst = false` for sequences that read top to bottom (bubbling order, lifecycle).
 */
export function eventLog(out: HTMLElement | null, max = 6, newestFirst = true): (line: string) => void {
  const lines: string[] = [];
  return (line) => {
    if (newestFirst) lines.unshift(line);
    else lines.push(line);
    while (lines.length > max) (newestFirst ? lines.pop() : lines.shift());
    if (out) out.textContent = lines.join('\n');
  };
}

/**
 * Fires pointerdown + pointerup on the canvas at a canvas position, which VChart reads as a click.
 * (A synthetic pointermove does not hover, so hover-type events are driven through the API instead.)
 */
export function clickAt(container: HTMLElement, x: number, y: number): void {
  const canvas = container.querySelector('canvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const init: PointerEventInit = { bubbles: true, cancelable: true, clientX: rect.left + x, clientY: rect.top + y, pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 };
  canvas.dispatchEvent(new PointerEvent('pointerdown', { ...init, buttons: 1 }));
  canvas.dispatchEvent(new PointerEvent('pointerup', { ...init, buttons: 0 }));
}

/** Clicks the mark that draws `datum` (the position comes from convertDatumToPosition). */
export function clickDatum(vchart: IVChart, container: HTMLElement, datum: Record<string, unknown>, dy = 4): boolean {
  const p = vchart.convertDatumToPosition(datum as never, undefined, true);
  if (!p) return false;
  clickAt(container, p.x, p.y + dy);
  return true;
}
