/** @jsxImportSource @antv/infographic */
// Radial: a custom layout that puts children on a circle
import type { JSXElement } from '@antv/infographic';
import { cloneElement, createLayout, Ellipse, getElementBounds, Group, Rect, Text } from '@antv/infographic';

const Radial = createLayout<{ radius?: number; x?: number; y?: number }>((children, { radius = 70, ...props }) => {
  const placed = children.map((child, i) => {
    const angle = (i * Math.PI * 2) / children.length - Math.PI / 2;
    const b = getElementBounds(child);
    return cloneElement(child, {
      x: radius + radius * Math.cos(angle) - b.width / 2,
      y: radius + radius * Math.sin(angle) - b.height / 2,
    });
  });
  return (
    <Group {...props}>
      <Ellipse width={radius * 2} height={radius * 2} fill="none" stroke="#64748b" strokeDasharray="5 5" />
      {placed}
    </Group>
  );
});

const Dot = ({ n, fill }: { n: number; fill: string }) => (
  <>
    <Rect width={34} height={34} rx={17} fill={fill} />
    <Text width={34} height={34} fontSize={16} fontWeight="bold" fill="#0f172a" alignHorizontal="center" alignVertical="middle">
      {String(n)}
    </Text>
  </>
);
const COLORS = ['#f87171', '#fbbf24', '#4ade80', '#38bdf8', '#c084fc', '#f472b6', '#a3e635'];
const radial = (radius: number, n: number): JSXElement => (
  <Radial x={160 - radius} y={100 - radius} radius={radius}>
    {COLORS.slice(0, n).map((fill, i) => (
      <Dot n={i + 1} fill={fill} />
    ))}
  </Radial>
);

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: 'radius 60, 4 children', node: radial(60, 4) },
  { say: 'radius 80, 6 children', node: radial(80, 6) },
  { say: 'radius 40, 3 children', node: radial(40, 3) },
];
