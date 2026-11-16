// Layout: position as four distances from the parent's edges
import { Box, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/position'; // the position plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Like CSS absolute positioning: the distances to the four edges decide x, y, width and height.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const B = size(stage) * 1.3;
  const parent = new Box({ ...mid(stage, B, B * 0.7), y: 10, width: B, height: B * 0.7, fill: '#FF4A2C' });
  const rect = new Rect({ fill: '#32cd79' });
  parent.add(rect);
  leafer.add(parent);
  const show = label(stage, '', true);
  const inset = { top: 20, right: 20, bottom: 20, left: 20 };
  const apply = (): void => {
    rect.position = { ...inset };
  };
  const report = (): void => {
    show(`rect.position = { top: ${inset.top}, right: ${inset.right}, bottom: ${inset.bottom}, left: ${inset.left} }\nx ${Math.round(rect.x!)}  y ${Math.round(rect.y!)}  width ${Math.round(rect.width!)}  height ${Math.round(rect.height!)}`);
  };
  stage.every(120, report);
  if (stage.bar) {
    for (const side of ['top', 'right', 'bottom', 'left'] as const) slider(stage.bar, side, 0, 70, 1, inset[side], (v) => ((inset[side] = v), apply()));
    apply();
  } else {
    drive(stage, 'all four', [8, 50, 1], 20, (v) => ((inset.top = inset.right = inset.bottom = inset.left = v), apply()), 3);
  }

  return stage.dispose;
};

export default mount;
