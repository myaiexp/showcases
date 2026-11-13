// The official blendEases() helper, copied from the docs (typed; blender may be an ease string)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/blendEases
// Feed in the starting ease and the ending ease (and optionally an ease to do the blending)
// and it returns a new ease function that blends them. This is the docs' demo version, which
// runs the blender through gsap.parseEase() so strings work; the snippet above it only
// accepts a function and silently falls back to "power4.inOut" for strings.
export type EaseInput = string | ((progress: number) => number);

export function blendEases(startEase: EaseInput, endEase: EaseInput, blender?: EaseInput): (progress: number) => number {
  const s = gsap.parseEase(startEase);
  const e = gsap.parseEase(endEase);
  const blend = gsap.parseEase(blender || 'power3.inOut');
  return (v) => {
    const b = blend(v);
    return s(v) * (1 - b) + e(v) * b;
  };
}
