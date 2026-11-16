// Layout: the relative argument turns an ancestor into the world
import { Frame, Group, Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, pick } from '../../shared/shapes.ts';
import { marker, placeMarker, pt } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'getWorldPoint(inner, frame) measures from the Frame instead of the canvas. The red dot is the inner point (10, 10) of the scaled rect.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 0.6 : 1;
  const frame = new Frame({ x: stage.width * 0.25, y: 14, width: stage.width * 0.7, height: stage.height - 76, fill: '#fff', overflow: 'show' });
  const rect = new Rect({ x: 50 * k, y: 40 * k, scale: 5 * k, width: 20, height: 14, fill: '#32cd79' });
  frame.add(rect);
  leafer.add(frame);
  leafer.add(new Text({ x: 4, y: 14, text: 'frame ↗', fontSize: stage.preview ? 10 : 13, fill: '#888', hittable: false }));
  const dot = marker(leafer, 0, 0);
  const show = label(stage, '', true);
  pick(stage, 'relative', ['(none)', 'frame'] as const, (name) => {
    const inner = { x: 10, y: 10 };
    const world = rect.getWorldPoint(inner);
    const rel = name === 'frame' ? rect.getWorldPoint(inner, frame) : world;
    placeMarker(dot, world.x, world.y);
    show(`rect.getWorldPoint({ x: 10, y: 10 }${name === 'frame' ? ', frame' : ''})\n${pt(rel)}   (world is ${pt(world)}, the frame starts at ${frame.x}, ${frame.y})`);
  }, 2200);

  return stage.dispose;
};

export default mount;
