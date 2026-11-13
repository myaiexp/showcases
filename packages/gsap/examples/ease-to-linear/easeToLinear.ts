// The official easeToLinear() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/easeToLinear
// An ease maps linear progress (0-1) to an eased value. This does the reverse: give it the eased
// ratio you care about (like 0.7) and it finds the linear progress at which the ease reaches it.
export function easeToLinear(easeIn: string | ((p: number) => number), ratio: number, precision = 0.0001): number {
  const ease = gsap.parseEase(easeIn);
  let t = 0;
  let dif = ratio - ease(t);
  let inc = dif / 2;
  let newDif: number;
  while (Math.abs(dif) > precision) {
    newDif = ratio - ease((t += inc));
    newDif < 0 !== inc < 0 && (inc *= Math.max(-0.5, newDif / dif));
    dif = newDif;
  }
  return t + ((ratio - ease(t + inc)) / dif) * -inc;
}
