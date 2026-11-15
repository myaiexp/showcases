/** @jsxImportSource @antv/infographic */
// Fragment scenes: one component of siblings, grouped and repeated
import type { JSXElement } from '@antv/infographic';
import { Group, Rect, Text } from '@antv/infographic';

const COLORS = ['#f97316', '#22c55e', '#3b82f6'];

/** Returns six siblings in a fragment: no wrapping element is produced. */
const Legend = () => (
  <>
    {COLORS.map((color, i) => (
      <>
        <Rect x={0} y={i * 36} width={24} height={24} rx={6} fill={color} />
        <Text x={34} y={i * 36} width={110} height={24} fontSize={16} fill="#e2e8f0" alignVertical="middle">
          {'Series ' + (i + 1)}
        </Text>
      </>
    ))}
  </>
);

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: '<Legend /> alone: siblings at the origin', node: <Group x={20} y={20}><Legend /></Group> },
  { say: 'a Group x={90} y={40} moves every sibling together', node: <Group x={90} y={40}><Legend /></Group> },
  {
    say: 'two copies: <Group x> twice',
    node: (
      <>
        <Group x={20} y={40}><Legend /></Group>
        <Group x={170} y={40} opacity={0.6}><Legend /></Group>
      </>
    ),
  },
];
