/** @jsxImportSource @antv/infographic */
// Path scenes: a triangle, the same triangle moved by x and y, and a curve
import type { JSXElement } from '@antv/infographic';
import { Path } from '@antv/infographic';

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: 'd="M 0 0 L 100 100 L 100 0 Z"', node: <Path d="M 0 0 L 100 100 L 100 0 Z" width={100} height={100} x={110} y={50} fill="#a78bfa" /> },
  {
    say: 'x={30} y={30} adds translate(30, 30)',
    node: (
      <>
        <Path d="M 0 0 L 100 100 L 100 0 Z" width={100} height={100} fill="none" stroke="#64748b" />
        <Path d="M 0 0 L 100 100 L 100 0 Z" width={100} height={100} x={30} y={30} fill="#a78bfa" />
      </>
    ),
  },
  {
    say: 'a curve: fill none, stroke only',
    node: <Path d="M 40 150 Q 160 -10 280 150" width={240} height={160} fill="none" stroke="#38bdf8" strokeWidth={6} strokeLinecap="round" />,
  },
];
