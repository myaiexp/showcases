// The waapi.animate calls shown by the tour, each with the source text displayed beside it
import { spring, stagger, utils, waapi } from 'animejs';
import type { WAAPIAnimation } from 'animejs';

export interface Demo {
  label: string;
  code: string;
  run(targets: HTMLElement[]): WAAPIAnimation;
}

export const DEMOS: Demo[] = [
  {
    label: 'Defaults + multi-target',
    code: "waapi.animate('.dot', {\n  translate: '10rem',\n  delay: stagger(100),\n});\n// duration, ease and final value are handled",
    run: (t) => waapi.animate(t, { translate: '10rem', delay: stagger(100) }),
  },
  {
    label: 'Default units',
    code: 'waapi.animate(dots, {\n  x: 150,        // px\n  rotate: 90,    // deg\n  width: 30,     // px\n  opacity: .5,\n});',
    run: (t) => waapi.animate(t, { x: 150, rotate: 90, width: 30, opacity: 0.5, delay: stagger(80) }),
  },
  {
    label: 'Function values',
    code: 'waapi.animate(dots, {\n  translate: () => `${utils.random(2, 10)}rem`,\n  rotate: () => utils.random(-180, 180),\n  scale: (_, i) => .5 + i * .2,\n});',
    run: (t) =>
      waapi.animate(t, {
        translate: () => `${utils.random(2, 10)}rem`,
        rotate: () => utils.random(-180, 180),
        scale: (_: unknown, i?: number) => 0.5 + (i ?? 0) * 0.2,
        delay: stagger(60),
      }),
  },
  {
    label: 'Individual property params',
    code: 'waapi.animate(dots, {\n  y: { to: [0, -30, 0], ease: \'out(4)\', duration: 1000 },\n  rotate: { from: -180, to: 0, ease: \'out(3)\' },\n  scale: { to: [.65, 1, .65], ease: \'inOut(3)\' },\n  duration: 500,\n  delay: stagger(75),\n});',
    run: (t) =>
      waapi.animate(t, {
        y: { to: [0, -30, 0], ease: 'out(4)', duration: 1000 },
        rotate: { from: -180, to: 0, ease: 'out(3)' },
        scale: { to: [0.65, 1, 0.65], ease: 'inOut(3)' },
        duration: 500,
        delay: stagger(75),
      }),
  },
  {
    label: 'Spring easing',
    code: 'waapi.animate(dots, {\n  y: [0, -30, 0],\n  ease: spring({ stiffness: 150, damping: 5 }),\n  delay: stagger(75),\n});',
    run: (t) => waapi.animate(t, { y: [0, -30, 0], ease: spring({ stiffness: 150, damping: 5 }), delay: stagger(75) }),
  },
];
