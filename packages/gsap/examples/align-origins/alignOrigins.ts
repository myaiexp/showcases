// The official alignOrigins() helper, copied from the docs (typed only; needs MotionPathPlugin)
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

// Source: docs/v3/HelperFunctions/helpers/alignOrigins
// fromElement is the one whose transformOrigin should change to match up with the toElement's
// transformOrigin, without the element jumping.
export function alignOrigins(fromElement: Element, toElement: Element): void {
  const [fromEl, toEl] = gsap.utils.toArray<HTMLElement>([fromElement, toElement]) as [HTMLElement, HTMLElement];
  const a = window.getComputedStyle(toEl).transformOrigin.split(' ');
  const newOrigin = MotionPathPlugin.convertCoordinates(toEl, fromEl, {
    x: parseFloat(a[0] as string),
    y: parseFloat(a[1] as string),
  });
  const bounds1 = fromEl.getBoundingClientRect();
  gsap.set(fromEl, {
    transformOrigin: newOrigin.x + 'px ' + newOrigin.y + 'px',
  });
  const bounds2 = fromEl.getBoundingClientRect();
  gsap.set(fromEl, {
    x: '+=' + (bounds1.left - bounds2.left),
    y: '+=' + (bounds1.top - bounds2.top),
  });
}
