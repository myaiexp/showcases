// Layout: position distances as a percentage of the parent
import { Box, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/position'; // the position plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'bottom is 20% of the parent\'s height: resize the Box and the rect keeps the percentage.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const W = size(stage) * 1.3, H = size(stage) * 0.9;
  const parent = new Box({ ...mid(stage, W, H), y: 10, width: W, height: H, fill: '#FF4A2C' });
  const rect = new Rect({ width: W * 0.2, height: H * 0.15, fill: '#32cd79' });
  parent.add(rect);
  leafer.add(parent);
  rect.position = { bottom: { value: 0.2, type: 'percent' }, left: { value: 0.1, type: 'percent' } };
  const show = label(stage, '', true);
  drive(stage, 'box height', [H * 0.4, H, 1], H, (v) => (parent.height = v), 4);
  stage.every(120, () => show(`rect.position = { bottom: 20%, left: 10% }\nBox height ${Math.round(parent.height!)}  ->  rect y ${Math.round(rect.y!)}  x ${Math.round(rect.x!)}`));

  return stage.dispose;
};

export default mount;
