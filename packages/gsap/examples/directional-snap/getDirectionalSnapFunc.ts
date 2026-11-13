// The official getDirectionalSnapFunc() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/getDirectionalSnapFunc
// Like gsap.utils.snap(), but the returned function also takes a direction: 1 snaps to the
// closest value that is GREATER, -1 to the closest that is LESSER, 0 (or none) to the closest.
// Accepts an increment or an Array of values.
export function getDirectionalSnapFunc(snapIncrementOrArray: number | number[]): (value: number, direction?: number) => number {
  const snap = gsap.utils.snap(snapIncrementOrArray as number);
  const a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort((a, b) => a - b);
  return a
    ? (valueIn, direction) => {
        let value = valueIn;
        let i: number;
        if (!direction) {
          return snap(value);
        }
        if (direction > 0) {
          value -= 1e-4; // to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.
          for (i = 0; i < a.length; i++) {
            if ((a[i] as number) >= value) {
              return a[i] as number;
            }
          }
          return a[i - 1] as number;
        } else {
          i = a.length;
          value += 1e-4;
          while (i--) {
            if ((a[i] as number) <= value) {
              return a[i] as number;
            }
          }
        }
        return a[0] as number;
      }
    : (value, direction) => {
        const snapped = snap(value);
        return !direction || Math.abs(snapped - value) < 0.001 || snapped - value < 0 === direction < 0
          ? snapped
          : snap(direction < 0 ? value - (snapIncrementOrArray as number) : value + (snapIncrementOrArray as number));
      };
}
