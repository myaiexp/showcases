// Scripted pointer path and resize loop for cards that cannot take real input
import type { Stage } from './stage.ts';
import type { CSSDoodle } from './types.ts';

/** Sends pointermove events along a looping path over the doodle (the element listens on itself). */
export function ghostPointer(stage: Stage, doodle: CSSDoodle): void {
  stage.frame((t) => {
    const r = doodle.getBoundingClientRect();
    if (!r.width) return;
    const x = 0.5 + 0.38 * Math.sin(t * 0.9);
    const y = 0.5 + 0.38 * Math.sin(t * 1.3 + 1);
    doodle.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, clientX: r.left + x * r.width, clientY: r.top + y * r.height }),
    );
  });
}

/** Squeezes and stretches the doodle's width so @uw and @uh keep changing. */
export function breathe(stage: Stage, doodle: CSSDoodle): void {
  const base = doodle.getBoundingClientRect().width || 168;
  stage.frame((t) => {
    doodle.style.width = `${base * (0.6 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.2)))}px`;
  });
  stage.onDispose(() => doodle.style.removeProperty('width'));
}
