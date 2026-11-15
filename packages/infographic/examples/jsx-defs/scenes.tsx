/** @jsxImportSource @antv/infographic */
// Defs scenes: a linear gradient, a radial gradient and a drop shadow
import type { JSXElement } from '@antv/infographic';
import { Defs, Ellipse, Rect } from '@antv/infographic';

export const SCENES: { say: string; node: JSXElement }[] = [
  {
    say: 'linearGradient referenced by fill="url(#showcase-lin)"',
    node: (
      <>
        <Defs>
          <linearGradient id="showcase-lin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </Defs>
        <Rect x={50} y={50} width={220} height={100} rx={16} fill="url(#showcase-lin)" />
      </>
    ),
  },
  {
    say: 'radialGradient on an Ellipse',
    node: (
      <>
        <Defs>
          <radialGradient id="showcase-rad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>
        </Defs>
        <Ellipse x={100} y={20} width={160} height={160} fill="url(#showcase-rad)" />
      </>
    ),
  },
  {
    say: 'filter="url(#showcase-shadow)": feDropShadow',
    node: (
      <>
        <Defs>
          <filter id="showcase-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx={4} dy={8} stdDeviation={6} floodColor="#000000" floodOpacity={0.7} />
          </filter>
        </Defs>
        <Rect x={70} y={40} width={180} height={90} rx={12} fill="#38bdf8" filter="url(#showcase-shadow)" />
      </>
    ),
  },
];
