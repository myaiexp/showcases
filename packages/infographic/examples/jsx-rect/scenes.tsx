/** @jsxImportSource @antv/infographic */
// Three Rect scenes: plain, rounded with a stroke, overlapping with opacity
import type { JSXElement } from '@antv/infographic';
import { Rect } from '@antv/infographic';

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: '<Rect x width height fill />', node: <Rect x={60} y={50} width={200} height={100} fill="#3b82f6" /> },
  {
    say: 'rx, stroke and strokeWidth',
    node: <Rect x={60} y={50} width={200} height={100} rx={24} fill="#1e3a8a" stroke="#93c5fd" strokeWidth={4} />,
  },
  {
    say: 'opacity: three rectangles overlapping',
    node: (
      <>
        <Rect x={50} y={40} width={120} height={100} fill="#ef4444" opacity={0.7} />
        <Rect x={110} y={60} width={120} height={100} fill="#22c55e" opacity={0.7} />
        <Rect x={170} y={30} width={100} height={120} fill="#3b82f6" opacity={0.7} />
      </>
    ),
  },
];
