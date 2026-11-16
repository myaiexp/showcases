// Ellipse: circle (width = height) and ellipse
import { Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change width and height: equal values give a circle.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const ellipse = new Ellipse({ ...mid(stage, S), width: S, height: S, fill: '#32cd79', draggable: true });
  leafer.add(ellipse);
  drive(stage, 'width', [40, 360, 2], S, (v) => (ellipse.width = v), 5);
  drive(stage, 'height', [40, 300, 2], S, (v) => (ellipse.height = v), 7);

  return stage.dispose;
};

export default mount;
