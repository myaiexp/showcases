// The official smoothOriginChange() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/smoothOriginChange
// Changes transformOrigin dynamically without a jump by compensating the translation (x/y).
export function smoothOriginChange(targets: gsap.TweenTarget, transformOrigin: string): void {
  gsap.utils.toArray<HTMLElement>(targets).forEach((target) => {
    const before = target.getBoundingClientRect();
    gsap.set(target, { transformOrigin });
    const after = target.getBoundingClientRect();
    gsap.set(target, {
      x: '+=' + (before.left - after.left),
      y: '+=' + (before.top - after.top),
    });
  });
}
