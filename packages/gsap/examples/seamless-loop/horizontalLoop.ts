// The official horizontalLoop() helper (seamlessLoop page), copied from the docs and typed
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/seamlessLoop
// Makes a group of elements animate along the x-axis in a seamless, responsive loop. The
// returned timeline gets next(), previous(), toIndex(), current() and times added to it.
export interface LoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false;
  paddingRight?: number | string;
  reversed?: boolean;
}

export type HorizontalLoop = gsap.core.Timeline & {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  times: number[];
};

export function horizontalLoop(itemsIn: gsap.TweenTarget, config: LoopConfig = {}): HorizontalLoop {
  const items = gsap.utils.toArray<HTMLElement>(itemsIn);
  // Typing change: the docs call tl.vars.onReverseComplete(); a named function does the same job.
  const rewind = (): void => {
    tl.totalTime(tl.rawTime() + tl.duration() * 100);
  };
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete: rewind,
  }) as HorizontalLoop;
  const length = items.length;
  const first = items[0] as HTMLElement;
  const last = items[length - 1] as HTMLElement;
  const startX = first.offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  // some browsers shift by a pixel to accommodate flex layouts, so snap to 5 percentage points
  const snap: (v: number) => number = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1);
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays
    xPercent: (i: number, el: HTMLElement) => {
      const w = (widths[i] = parseFloat(String(gsap.getProperty(el, 'width', 'px'))));
      xPercents[i] = snap(
        (parseFloat(String(gsap.getProperty(el, 'x', 'px'))) / w) * 100 + Number(gsap.getProperty(el, 'xPercent')),
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  const totalWidth =
    last.offsetLeft +
    ((xPercents[length - 1] as number) / 100) * (widths[length - 1] as number) -
    startX +
    last.offsetWidth * Number(gsap.getProperty(last, 'scaleX')) +
    (parseFloat(String(config.paddingRight)) || 0);
  for (let i = 0; i < length; i++) {
    const item = items[i] as HTMLElement;
    const w = widths[i] as number;
    const curX = ((xPercents[i] as number) / 100) * w;
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop = distanceToStart + w * Number(gsap.getProperty(item, 'scaleX'));
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / w) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / w) * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add('label' + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(indexIn: number, varsIn?: gsap.TweenVars): gsap.core.Tween {
    const vars: gsap.TweenVars = varsIn || {};
    let index = indexIn;
    Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length); // always go in the shortest direction
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex] as number;
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    rewind();
    tl.reverse();
  }
  return tl;
}
