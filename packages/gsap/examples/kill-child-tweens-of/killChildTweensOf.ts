// The official killChildTweensOf() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/killChildTweensOf
// Kills every tweening element that is a child of the given target.
export function killChildTweensOf(ancestorIn: gsap.TweenTarget): void {
  const ancestor = gsap.utils.toArray<Element>(ancestorIn)[0] as Element;
  (gsap.globalTimeline.getChildren(true, true, false) as gsap.core.Tween[]).forEach((tween) =>
    (tween.targets() as Node[]).forEach((e) => e.nodeType && ancestor.contains(e) && tween.kill(e)),
  );
}
