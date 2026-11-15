// Input for draggable diagrams: real pointer drags in full views, scripted drags in cards
import { getScreenToSvgPosition } from '@penrose/core';
import type { Grip, Interactive } from './interactive.ts';
import { STOPPED, type Stage } from './stage.ts';

/** Pointer drags on the paper: down on a shape grabs it, moves drag it, up releases; right-click toggles a pin. */
export function wirePointer(stage: Stage, api: Interactive, svgOf: () => SVGSVGElement | null, titles: () => Map<string, SVGElement>, mode: 'edit' | 'play'): void {
  let grip: Grip | null = null;
  let origin = { x: 0, y: 0 };
  const hit = (target: EventTarget | null): string | null => {
    for (const [path, node] of titles()) if (target instanceof Node && node.contains(target)) return path;
    return null;
  };
  /** Pointer position in canvas units: origin in the middle, y up. */
  const canvasAt = (e: PointerEvent): { x: number; y: number } | null => {
    const svg = svgOf();
    if (!svg) return null;
    const p = getScreenToSvgPosition(e, svg.getScreenCTM());
    const box = svg.viewBox.baseVal;
    return { x: p.x - box.width / 2, y: box.height / 2 - p.y };
  };
  const { signal } = stage;
  stage.paper.addEventListener(
    'pointerdown',
    (e) => {
      const path = hit(e.target);
      if (!path || e.button !== 0) return;
      if (mode === 'play' && !api.constrained().includes(path)) return;
      const at = canvasAt(e);
      grip = at ? api.grab(path) : null;
      if (grip && at) {
        origin = at;
        e.preventDefault();
      }
    },
    { signal },
  );
  window.addEventListener(
    'pointermove',
    (e) => {
      const at = grip && canvasAt(e);
      if (grip && at) grip.to(at.x - origin.x, at.y - origin.y);
    },
    { signal },
  );
  const up = (): void => {
    grip?.release();
    grip = null;
  };
  window.addEventListener('pointerup', up, { signal });
  window.addEventListener('pointercancel', up, { signal });
  stage.paper.addEventListener(
    'contextmenu',
    (e) => {
      const path = hit(e.target);
      if (!path || mode === 'play') return;
      e.preventDefault();
      api.setPinned(path, !api.pinned().includes(path));
    },
    { signal },
  );
}

/**
 * A card has no pointer, so it plays a drag itself: grab `path`, move it along `curve(t)`
 * (t from 0 to 1, offsets in canvas units from where it was grabbed), release. Resolves
 * when released, or quietly when the stage is disposed first.
 */
export async function scriptedDrag(
  stage: Stage,
  api: Interactive,
  path: string,
  curve: (t: number) => [number, number],
  ms = 2400,
): Promise<void> {
  const grip = api.grab(path);
  if (!grip) return;
  const steps = Math.max(2, Math.round(ms / 70));
  try {
    for (let i = 1; i <= steps; i++) {
      await stage.wait(70);
      grip.to(...curve(i / steps));
    }
    await stage.wait(250);
  } catch (err) {
    if (err !== STOPPED) throw err;
    return;
  }
  grip.release();
}
