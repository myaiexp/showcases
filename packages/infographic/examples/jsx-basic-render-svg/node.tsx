/** @jsxImportSource @antv/infographic */
// The JSX page's Node component: a rectangle with a line of text in a group
import { Group, Rect, Text } from '@antv/infographic';

export const Node = ({ fill, label }: { fill: string; label: string }) => (
  <Group>
    <Rect width={100} height={50} fill={fill} />
    <Text x={10} y={30} fill="white">
      {label}
    </Text>
  </Group>
);

/** `<Node />` as an element, for main.ts (a .ts file cannot hold JSX). */
export const nodeElement = (fill: string, label: string) => <Node fill={fill} label={label} />;
