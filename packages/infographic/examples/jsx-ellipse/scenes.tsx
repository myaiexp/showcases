/** @jsxImportSource @antv/infographic */
// Ellipse scenes showing the box that x, y, width and height describe
import type { JSXElement } from '@antv/infographic';
import { Ellipse, Rect } from '@antv/infographic';

export const SCENES: { say: string; node: JSXElement }[] = [
  {
    say: 'width 200, height 100: the dashed box is the bounds',
    node: (
      <>
        <Rect x={60} y={50} width={200} height={100} fill="none" stroke="#64748b" strokeDasharray="6 4" />
        <Ellipse x={60} y={50} width={200} height={100} fill="#f59e0b" />
      </>
    ),
  },
  { say: 'equal width and height: a circle', node: <Ellipse x={110} y={30} width={140} height={140} fill="#10b981" stroke="#065f46" strokeWidth={4} /> },
  {
    say: 'x and y at (20, 20): the corner, not the centre',
    node: (
      <>
        <Rect x={20} y={20} width={90} height={90} fill="none" stroke="#64748b" strokeDasharray="6 4" />
        <Ellipse x={20} y={20} width={90} height={90} fill="none" stroke="#f472b6" strokeWidth={8} />
        <Ellipse x={200} y={90} width={90} height={90} fill="#f472b6" />
      </>
    ),
  },
];
