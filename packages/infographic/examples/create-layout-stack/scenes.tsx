/** @jsxImportSource @antv/infographic */
// Stack: a custom layout built with createLayout, measured and moved
import type { JSXElement } from '@antv/infographic';
import { cloneElement, createLayout, getElementBounds, Group, Rect, Text } from '@antv/infographic';

// The layout function gets the child elements and the props written on <Stack>.
const Stack = createLayout<{ gap?: number; x?: number; y?: number }>((children, { gap = 8, ...props }) => {
  let offsetY = 0;
  const placed = children.map((child) => {
    const bounds = getElementBounds(child);
    const next = cloneElement(child, { x: 0, y: offsetY });
    offsetY += bounds.height + gap;
    return next;
  });
  return <Group {...props}>{placed}</Group>;
});

const Card = ({ title, w = 200 }: { title: string; w?: number }) => (
  <>
    <Rect width={w} height={34} rx={8} fill="#334155" />
    <Text width={w} height={34} fontSize={15} fill="#e2e8f0" alignHorizontal="center" alignVertical="middle">
      {title}
    </Text>
  </>
);

const stack = (gap: number): JSXElement => (
  <Stack x={60} y={20} gap={gap}>
    <Card title="First" />
    <Card title="Second" />
    <Card title="Third" />
  </Stack>
);

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: '<Stack gap={4}>', node: stack(4) },
  { say: '<Stack gap={16}>', node: stack(16) },
  { say: '<Stack gap={32}>', node: stack(32) },
];
