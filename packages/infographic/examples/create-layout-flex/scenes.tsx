/** @jsxImportSource @antv/infographic */
// FlexLayout scenes: space-between, a centred column and wrapping
import type { JSXElement } from '@antv/infographic';
import { FlexLayout, Rect } from '@antv/infographic';

const COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'];
const boxes = (): JSXElement[] =>
  COLORS.map((fill, i) => <Rect width={40 + (i % 2) * 12} height={34 + (i % 3) * 8} rx={8} fill={fill} />);

export const SCENES: { say: string; node: JSXElement }[] = [
  {
    say: 'row, justifyContent="space-between", width 280',
    node: (
      <>
        <Rect x={20} y={40} width={280} height={110} fill="none" stroke="#64748b" strokeDasharray="6 4" />
        <FlexLayout x={20} y={40} width={280} height={110} justifyContent="space-between" alignItems="center">
          {boxes()}
        </FlexLayout>
      </>
    ),
  },
  {
    say: 'flexDirection="column", alignItems="center", gap 6',
    node: (
      <FlexLayout x={120} y={10} flexDirection="column" alignItems="center" gap={6}>
        {boxes().slice(0, 4)}
      </FlexLayout>
    ),
  },
  {
    say: 'flexWrap="wrap" in a frame 160 wide, gap 10',
    node: (
      <>
        <Rect x={80} y={10} width={160} height={180} fill="none" stroke="#64748b" strokeDasharray="6 4" />
        <FlexLayout x={80} y={10} width={160} height={180} flexWrap="wrap" gap={8}>
          {boxes()}
        </FlexLayout>
      </>
    ),
  },
];
