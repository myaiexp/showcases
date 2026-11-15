/** @jsxImportSource @antv/infographic */
// getElementsBounds scenes: a union that grows with each shape
import type { JSXElement } from '@antv/infographic';
import { Ellipse, getElementsBounds, Rect } from '@antv/infographic';

const SHAPES: JSXElement[] = [
  <Rect x={40} y={50} width={80} height={50} rx={8} fill="#3b82f6" />,
  <Ellipse x={150} y={30} width={60} height={60} fill="#f59e0b" />,
  <Rect x={200} y={120} width={90} height={40} rx={8} fill="#22c55e" />,
];

const upTo = (n: number): { node: JSXElement; note: string } => {
  const list = SHAPES.slice(0, n);
  const b = getElementsBounds(list);
  return {
    note: 'getElementsBounds([' + n + ' nodes]) = ' + JSON.stringify(b),
    node: (
      <>
        {list}
        <Rect x={b.x} y={b.y} width={b.width} height={b.height} fill="none" stroke="#f43f5e" strokeWidth={2} strokeDasharray="6 4" />
      </>
    ),
  };
};

export const SCENES: { say: string; node: JSXElement; note: string }[] = [
  { say: 'one node', ...upTo(1) },
  { say: 'two nodes', ...upTo(2) },
  { say: 'three nodes', ...upTo(3) },
];
