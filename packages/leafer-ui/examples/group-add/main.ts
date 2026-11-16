// Group: add() puts children under one parent
import { Ellipse, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the rotation; drag either shape to move the group\'s child.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ width: S, height: S, fill: '#32cd79', draggable: true });
  const ellipse = new Ellipse({ x: S / 2, y: S / 2, width: S, height: S, innerRadius: 0.5, fill: '#FEB027' });
  const group = new Group({ x: stage.width / 2 - S * 0.75, y: stage.height / 2 - S * 0.75, around: 'center' });
  group.add([rect, ellipse]);
  leafer.add(group);
  drive(stage, 'rotation', [-180, 180, 1], 0, (v) => (group.rotation = v), 8);

  return stage.dispose;
};

export default mount;
