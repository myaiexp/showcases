/** @jsxImportSource @antv/infographic */
// getElementBounds scenes: a rect, a group of shapes and a component
import type { JSXElement, JSXNode } from '@antv/infographic';
import { Ellipse, getElementBounds, Group, Rect } from '@antv/infographic';

const Pair = () => (
  <>
    <Rect width={70} height={40} fill="#6366f1" />
    <Ellipse x={50} y={30} width={60} height={60} fill="#f59e0b" />
  </>
);

/** The node, with a dashed rectangle drawn from what getElementBounds says about it. */
const measured = (node: JSXNode): { node: JSXElement; note: string } => {
  const b = getElementBounds(node);
  return {
    note: 'getElementBounds(node) = ' + JSON.stringify(b),
    node: (
      <>
        {node}
        <Rect x={b.x} y={b.y} width={b.width} height={b.height} fill="none" stroke="#f43f5e" strokeDasharray="5 4" />
      </>
    ),
  };
};

export const SCENES: { say: string; node: JSXElement; note: string }[] = [
  { say: 'a Rect with an explicit size', ...measured(<Rect x={60} y={40} width={150} height={70} rx={10} fill="#22c55e" />) },
  {
    say: 'a Group: the union of its children',
    ...measured(
      <Group x={40} y={30}>
        <Rect width={60} height={60} fill="#38bdf8" />
        <Rect x={90} y={50} width={100} height={50} fill="#a78bfa" />
      </Group>,
    ),
  },
  { say: 'a function component: measured by rendering it', ...measured(<Group x={80} y={30}><Pair /></Group>) },
];
