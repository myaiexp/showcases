// Layout: rotation is kept between -180 and 180
import { Box, Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Assign any angle: reading rotation back gives the same turn inside -180 to 180.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const rect = new Box({ x: stage.width / 2, y: stage.height / 2 - 26, width: S, height: S, around: 'center' });
  rect.add(new Rect({ width: S, height: S, fill: '#32cd79', cornerRadius: 8 }));
  rect.add(new Text({ x: S * 0.1, y: S * 0.3, width: S * 0.8, text: '→', fontSize: S * 0.4, fill: '#fff', textAlign: 'center', hittable: false }));
  leafer.add(rect);
  const show = label(stage, '', true);
  drive(stage, 'rotation', [-360, 360, 1], 0, (v) => {
    rect.rotation = v;
    show(`rect.rotation = ${v}\nreads back ${Math.round(rect.rotation!)}`);
  }, 8);

  return stage.dispose;
};

export default mount;
