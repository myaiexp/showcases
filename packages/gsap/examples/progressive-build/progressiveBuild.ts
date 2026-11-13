// The official progressiveBuild() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/progressiveBuild
// Organise code into a sequence of arguments: functions that each return an animation, with
// optional numbers (seconds of delay) sprinkled between them. Each function is only called once
// the animation from the previous one has finished.
export type BuildStep = number | (() => gsap.core.Animation | void);

export function progressiveBuild(...steps: BuildStep[]): gsap.core.Timeline {
  const data = steps;
  let i = 0;
  const tl: gsap.core.Timeline = gsap.timeline({
    onComplete: function () {
      const isNum = typeof data[i] === 'number';
      const delay = isNum ? (data[i++] as number) : 0;
      const func = data[i++];
      typeof func === 'function' && tl.add(func() as gsap.core.Animation, '+=' + delay);
    },
  });
  // Typing change: the docs call tl.vars.onComplete(); the same function, kept in a local.
  (tl.vars.onComplete as () => void)();
  return tl;
}
