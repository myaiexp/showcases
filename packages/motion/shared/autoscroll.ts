// A card has no wheel: this scrolls a panel back and forth by itself with one animate()
import { animate } from 'motion';

/**
 * Writes the scroll position of `scroller` from a single animated number, forwards and then
 * back, forever. Call it inside scopeMotion() so the loop stops with the scope. The maximum is
 * read on every frame, so it follows content that grows.
 */
export function autoScroll(scroller: HTMLElement, o: { axis?: 'x' | 'y'; duration?: number } = {}): void {
  const horizontal = o.axis === 'x';
  animate(0, 1, {
    duration: o.duration ?? 5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
    onUpdate: (v) => {
      if (horizontal) scroller.scrollLeft = v * (scroller.scrollWidth - scroller.clientWidth);
      else scroller.scrollTop = v * (scroller.scrollHeight - scroller.clientHeight);
    },
  });
}
