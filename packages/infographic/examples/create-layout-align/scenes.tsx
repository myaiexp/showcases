/** @jsxImportSource @antv/infographic */
// AlignLayout scenes: left/top, center/middle and right/bottom
import type { JSXElement } from '@antv/infographic';
import { AlignLayout, Rect, Text } from '@antv/infographic';

const align = (horizontal: 'left' | 'center' | 'right', vertical: 'top' | 'middle' | 'bottom'): JSXElement => (
  <>
    <Rect x={40} y={20} width={240} height={150} fill="none" stroke="#64748b" strokeDasharray="6 4" />
    <AlignLayout x={40} y={20} width={240} height={150} horizontal={horizontal} vertical={vertical}>
      <Rect width={120} height={26} rx={6} fill="#6366f1" />
      <Text width={80} height={22} fontSize={14} fill="#e2e8f0" alignHorizontal="center">
        label
      </Text>
      <Rect width={28} height={28} rx={14} fill="#f59e0b" />
    </AlignLayout>
  </>
);

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: 'horizontal="left" vertical="top"', node: align('left', 'top') },
  { say: 'horizontal="center" vertical="middle"', node: align('center', 'middle') },
  { say: 'horizontal="right" vertical="bottom"', node: align('right', 'bottom') },
];
