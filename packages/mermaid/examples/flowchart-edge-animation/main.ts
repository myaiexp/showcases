// Edge ids let an edge animate: animate: true, fast / slow, or a classDef with dash keyframes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// e1@==> names the edge; e1@{ animate: true } turns the dashes on.
const ANIMATE = `flowchart LR
  A e1@==> B
  e1@{ animate: true }`;

// animation: fast / slow is shorthand for animate: true plus a speed.
const SPEEDS = `flowchart LR
  Source e1@--> Fast
  Source e2@--> Slow
  e1@{ animation: fast }
  e2@{ animation: slow }`;

// A class that sets stroke-dasharray (commas escaped as \\,) and a dash animation, applied to the edge id.
const CLASS_DEF = `flowchart LR
  Sensor e1@--> Gateway
  Gateway e2@--> Cloud
  classDef animate stroke-dasharray: 9\\,5\\,stroke-dashoffset: 900\\,animation: dash 25s linear infinite;
  class e1 animate
  e2@{ animate: true }`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'animate: true', code: ANIMATE },
      { label: 'fast and slow', code: SPEEDS },
      { label: 'classDef', code: CLASS_DEF },
    ],
  });

export default mount;
