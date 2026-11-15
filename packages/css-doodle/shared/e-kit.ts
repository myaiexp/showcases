// Helpers for the pattern, shader and scene examples (batch E)
import type { Stage } from './stage.ts';
import type { CSSDoodle } from './types.ts';

/**
 * Cards have no pointer, so this sends the doodle's own pointermove events along `path`
 * (fractions of its size, by seconds). Only the doodle's frame hears them, never the page.
 */
export function fakeMouse(stage: Stage, doodle: CSSDoodle, path: (t: number) => [number, number]): void {
  if (!stage.preview) return;
  stage.frame((t) => {
    const frame = (doodle as unknown as { frame?: HTMLElement }).frame ?? doodle;
    const box = frame.getBoundingClientRect();
    const [fx, fy] = path(t);
    frame.dispatchEvent(
      new PointerEvent('pointermove', { clientX: box.left + fx * box.width, clientY: box.top + fy * box.height }),
    );
  });
}
