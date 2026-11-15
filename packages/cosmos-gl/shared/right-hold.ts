// Fakes a held right button over the graph: pointermove events with buttons = 2
import type { Ghost } from './ghost.ts';

export interface RightHold {
  /** Presses (or keeps pressing) the right button where the ghost pointer is. */
  press(): void;
  /** Lets the right button go. */
  release(): void;
}

/**
 * cosmos.gl reads the right button from the `buttons` of the last pointermove on its
 * canvas, so one move with buttons = 2 holds it down until a move with buttons = 0.
 */
export function rightHold(div: HTMLElement, pointer: Ghost): RightHold {
  const send = (buttons: number): void => {
    const canvas = div.querySelector('canvas');
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    canvas.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        isPrimary: true,
        pointerId: 1,
        pointerType: 'mouse',
        buttons,
        clientX: r.left + pointer.x,
        clientY: r.top + pointer.y,
      }),
    );
  };
  return { press: () => send(2), release: () => send(0) };
}
