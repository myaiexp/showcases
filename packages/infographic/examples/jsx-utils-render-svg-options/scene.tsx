/** @jsxImportSource @antv/infographic */
// A small scene (a card with a circle) for trying renderSVG options on
import { Ellipse, Rect, Text } from '@antv/infographic';

const Scene = () => (
  <>
    <Rect x={60} y={50} width={200} height={100} rx={14} fill="#6366f1" />
    <Ellipse x={76} y={66} width={68} height={68} fill="#fde047" />
    <Text x={156} y={66} width={90} height={68} fontSize={20} fontWeight="bold" fill="#fff" alignVertical="middle">
      Scene
    </Text>
  </>
);

/** The scene as an element, for main.ts (a .ts file cannot hold JSX). */
export const scene = () => <Scene />;
