// The start/end forms the example cycles through: strings, relative values, numbers, functions, clamp()
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

type Pos = number | string | ((self: ScrollTrigger) => number | string);
export interface Preset {
  label: string;
  note: string;
  start: Pos;
  end: Pos;
}

/** `box` is the trigger element, `scroller` the scroll box; functions read their sizes on every refresh. */
export function presets(box: HTMLElement, scroller: HTMLElement, calls: { n: number }): Preset[] {
  return [
    { label: '"top bottom" to "bottom top"', note: 'the defaults; the trigger is near the top of the page, so start is negative', start: 'top bottom', end: 'bottom top' },
    { label: '"clamp(top bottom)" to "clamp(bottom top)"', note: 'clamp() keeps start and end between 0 and the maximum scroll', start: 'clamp(top bottom)', end: 'clamp(bottom top)' },
    { label: '"top 80%" to "+=300"', note: 'a relative end: 300px beyond where the start is', start: 'top 80%', end: '+=300' },
    { label: '"center center" to "+=100%"', note: '+=100% is one scroller height beyond the start', start: 'center center', end: '+=100%' },
    { label: '100 to 400', note: 'numbers are exact scroll positions in pixels', start: 100, end: 400 },
    { label: '"top top" to "max"', note: '"max" is the maximum scroll position', start: 'top top', end: 'max' },
    {
      label: 'functions',
      note: 'start/end functions run again on every refresh (see the call counter)',
      start: () => {
        calls.n++;
        return `top ${Math.round(scroller.clientHeight / 2)}px`;
      },
      end: () => `+=${box.offsetHeight * 3}`,
    },
  ];
}
