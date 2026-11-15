/** @jsxImportSource @antv/infographic */
// Text scenes: alignment in a frame, a wrapped paragraph and a background
import type { JSXElement } from '@antv/infographic';
import { Rect, Text } from '@antv/infographic';

export const SCENES: { say: string; node: JSXElement }[] = [
  {
    say: 'alignHorizontal left, center, right',
    node: (
      <>
        {['left', 'center', 'right'].map((align, i) => (
          <>
            <Rect x={50} y={30 + i * 55} width={220} height={44} fill="none" stroke="#64748b" />
            <Text x={50} y={30 + i * 55} width={220} height={44} fontSize={18} fill="#e2e8f0" alignHorizontal={align as 'left'} alignVertical="middle">
              {align}
            </Text>
          </>
        ))}
      </>
    ),
  },
  {
    say: 'wordWrap breaks lines inside width',
    node: (
      <>
        <Rect x={60} y={30} width={200} height={140} fill="none" stroke="#64748b" />
        <Text x={60} y={30} width={200} height={140} fontSize={16} wordWrap lineHeight={1.4} fill="#e2e8f0">
          Text wraps at the width of its frame when wordWrap is on, and keeps the line height you set.
        </Text>
      </>
    ),
  },
  {
    say: 'backgroundColor with backgroundRadius',
    node: (
      <Text
        x={60}
        y={70}
        width={200}
        height={60}
        fontSize={24}
        fontWeight="bold"
        fill="#0f172a"
        alignHorizontal="center"
        alignVertical="middle"
        backgroundColor="#fde047"
        backgroundRadius={14}
      >
        Highlighted
      </Text>
    ),
  },
];
