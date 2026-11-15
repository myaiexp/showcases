/** @jsxImportSource @antv/infographic */
// Group scenes: one badge moved, rotated and faded
import type { JSXElement } from '@antv/infographic';
import { Group, Rect, Text } from '@antv/infographic';

const Badge = () => (
  <>
    <Rect width={110} height={44} rx={10} fill="#6366f1" />
    <Rect x={8} y={8} width={28} height={28} rx={6} fill="#c7d2fe" />
    <Text x={44} y={8} width={60} height={28} fontSize={14} fill="#fff" alignVertical="middle">
      Badge
    </Text>
  </>
);

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: '<Group x={40} y={30}>', node: <Group x={40} y={30}><Badge /></Group> },
  {
    say: 'x={140} y={110} moves it; the first one stays',
    node: (
      <>
        <Group x={40} y={30} opacity={0.35}><Badge /></Group>
        <Group x={140} y={110}><Badge /></Group>
      </>
    ),
  },
  { say: 'transform="rotate(20)": a manual transform', node: <Group transform="translate(110 20) rotate(20)"><Badge /></Group> },
  {
    say: 'opacity={0.4} on the group fades all its children',
    node: (
      <>
        <Group x={80} y={40}><Badge /></Group>
        <Group x={120} y={90} opacity={0.4}><Badge /></Group>
      </>
    ),
  },
];
