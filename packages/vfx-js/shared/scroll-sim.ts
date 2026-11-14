// Scroll reveals in a card: the stage box stands in for the window
//
// VFX-JS measures `intersection` (and so enterProgress, leaveProgress, the *Reveal presets)
// against the window. A card cannot scroll the page, so `cardScroll` shrinks the root to
// the stage box with a negative `intersection.rootMargin` and slides the element up through
// that box on a loop. The margin is measured when the element is added, so it is measured
// again (remove + add) after the reader scrolls the gallery.
import type { VFX, VFXProps } from '@vfx-js/core';
import type { Stage } from './stage.ts';

/** rootMargin that shrinks the window to `box`: [top, right, bottom, left], negative px. */
function marginTo(box: Element): [number, number, number, number] {
  const r = box.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  return [-r.top, -(vw - r.right), -(vh - r.bottom), -r.left];
}

/**
 * Adds `el` with `props`, its intersection root shrunk to the stage, and slides it from
 * below the stage up through it and out of the top, every `period` seconds.
 */
export async function cardScroll(stage: Stage, vfx: VFX, el: HTMLElement, props: VFXProps, period = 5): Promise<void> {
  const box = stage.root;
  const add = (): Promise<void> =>
    vfx.add(el, { ...props, intersection: { ...props.intersection, rootMargin: marginTo(box) } });
  await add();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onScroll = (): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (stage.disposed) return;
      vfx.remove(el);
      void add();
    }, 200);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  stage.onDispose(() => {
    clearTimeout(timer);
    window.removeEventListener('scroll', onScroll);
  });
  // 0 → enter from below, hold in the middle, leave through the top.
  stage.frame((t) => {
    const p = (t % period) / period;
    const travel = box.clientHeight / 2 + el.offsetHeight / 2 + 8;
    let y: number;
    if (p < 0.3) y = travel * (1 - p / 0.3);
    else if (p < 0.6) y = 0;
    else if (p < 0.9) y = -travel * ((p - 0.6) / 0.3);
    else y = travel;
    el.style.transform = `translateY(${y.toFixed(1)}px)`;
  });
}

/** Tall spacers around `el`, so in the full view the reader scrolls it in and out of the window. */
export function scrollRoom(stage: Stage, el: HTMLElement): void {
  const room = (): HTMLDivElement => {
    const d = document.createElement('div');
    d.className = 'vx-scroll-room';
    d.textContent = '↓ scroll ↓';
    return d;
  };
  const column = document.createElement('div');
  column.className = 'vx-scroll-column';
  column.append(room(), el, room());
  stage.root.append(column);
}
