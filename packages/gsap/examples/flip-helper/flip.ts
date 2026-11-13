// The official flip() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/FLIP
// Pass in the elements, a function that performs your DOM changes, and optionally a vars object
// (duration, stagger, ease, onComplete, delay). Returns a Timeline with all the animation.
export interface FlipVars {
  duration?: number;
  stagger?: gsap.NumberValue | gsap.StaggerVars;
  ease?: string;
  onComplete?: () => void;
  delay?: number;
}
type FlipEl = HTMLElement & { _flip?: gsap.core.Timeline };

export function flip(elementsIn: gsap.TweenTarget, changeFunc: () => void, vars: FlipVars = {}): gsap.core.Timeline {
  const elements = gsap.utils.toArray<FlipEl>(elementsIn);
  const tl = gsap.timeline({ onComplete: vars.onComplete, delay: vars.delay || 0 });
  const bounds = elements.map((el) => el.getBoundingClientRect());
  const copy: gsap.TweenVars = {};
  elements.forEach((el) => {
    el._flip && el._flip.progress(1);
    el._flip = tl;
  });
  changeFunc();
  for (const p in vars) {
    p !== 'onComplete' && p !== 'delay' && ((copy as Record<string, unknown>)[p] = vars[p as keyof FlipVars]);
  }
  copy.x = (i: number, element: HTMLElement) => '+=' + ((bounds[i] as DOMRect).left - element.getBoundingClientRect().left);
  copy.y = (i: number, element: HTMLElement) => '+=' + ((bounds[i] as DOMRect).top - element.getBoundingClientRect().top);
  return tl.from(elements, copy);
}
