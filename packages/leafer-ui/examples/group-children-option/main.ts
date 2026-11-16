// Group: children in the constructor, groups nest
import { Ellipse, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide both rotations: the inner group turns inside the outer.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.5;
  const inner = new Group({ x: S * 1.4, y: 0, around: 'center', children: [
    new Rect({ width: S * 0.7, height: S * 0.7, fill: '#FF4B4B' }),
    new Ellipse({ x: S * 0.35, y: S * 0.35, width: S * 0.7, height: S * 0.7, fill: 'white' }),
  ] });
  const outer = new Group({ x: stage.width / 2 - S, y: stage.height / 2 - S * 0.5, around: 'center', children: [
    new Rect({ width: S, height: S, fill: '#32cd79', draggable: true }),
    inner,
  ] });
  leafer.add(outer);
  drive(stage, 'outer', [-90, 90, 1], 0, (v) => (outer.rotation = v), 8);
  drive(stage, 'inner', [-180, 180, 1], 0, (v) => (inner.rotation = v), 5);

  return stage.dispose;
};

export default mount;
