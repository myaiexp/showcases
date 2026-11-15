// Fakes a mouse drag on the canvas: mousedown, then mousemove and mouseup
import type { Ghost } from './ghost.ts';
import type { Stage } from './stage.ts';

/**
 * Drags from where the ghost pointer is by (dx, dy) px over `steps` moves. cosmos.gl's
 * d3-drag listens for mousedown on the canvas and the rest on the window, so a card can
 * drag a point (enableDrag) or pan the view. Call after the ghost has hovered the point.
 */
export async function dragBy(stage: Stage, div: HTMLElement, pointer: Ghost, dx: number, dy: number, steps = 14, stepMs = 45): Promise<void> {
  const canvas = div.querySelector('canvas');
  if (!canvas) return;
  const r = canvas.getBoundingClientRect();
  const at = (t: number): MouseEventInit => ({
    bubbles: true,
    cancelable: true,
    view: window,
    button: 0,
    clientX: r.left + pointer.x + dx * t,
    clientY: r.top + pointer.y + dy * t,
  });
  canvas.dispatchEvent(new MouseEvent('mousedown', { ...at(0), buttons: 1 }));
  for (let i = 1; i <= steps; i++) {
    await stage.wait(stepMs);
    window.dispatchEvent(new MouseEvent('mousemove', { ...at(i / steps), buttons: 1 }));
  }
  window.dispatchEvent(new MouseEvent('mouseup', { ...at(1), buttons: 0 }));
  pointer.moveTo(pointer.x + dx, pointer.y + dy);
}
