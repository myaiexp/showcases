/** @jsxImportSource @antv/infographic */
// getCombinedBounds scenes: union of measured bounds, plus an empty list
import type { Bounds, JSXElement } from '@antv/infographic';
import { getCombinedBounds, getElementBounds, Rect } from '@antv/infographic';

const parts: JSXElement[] = [
  <Rect x={30} y={30} width={90} height={60} rx={8} fill="#6366f1" />,
  <Rect x={150} y={80} width={60} height={90} rx={8} fill="#ec4899" />,
  <Rect x={240} y={20} width={50} height={50} rx={8} fill="#14b8a6" />,
];
// Measure once, merge as often as needed.
const measured: Bounds[] = parts.map((p) => getElementBounds(p));

const merged = (n: number): { node: JSXElement; note: string } => {
  const b = getCombinedBounds(measured.slice(0, n));
  return {
    note: 'getCombinedBounds(' + n + ' Bounds) = ' + JSON.stringify(b),
    node: (
      <>
        {parts}
        <Rect x={b.x} y={b.y} width={b.width} height={b.height} fill="none" stroke="#fde047" strokeWidth={2} strokeDasharray="6 4" />
      </>
    ),
  };
};

export const SCENES: { say: string; node: JSXElement; note: string }[] = [
  { say: 'the first Bounds', ...merged(1) },
  { say: 'the first two', ...merged(2) },
  { say: 'all three', ...merged(3) },
  { say: 'an empty list gives zero bounds', note: 'getCombinedBounds([]) = ' + JSON.stringify(getCombinedBounds([])), node: <>{parts}</> },
];
