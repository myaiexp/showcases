// Ellipse: a sector from startAngle to endAngle
import { Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide both angles: 0 degrees points right and angles run clockwise.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const sector = new Ellipse({ ...mid(stage, S), width: S, height: S, startAngle: -60, endAngle: 180, fill: '#32cd79' });
  leafer.add(sector);
  drive(stage, 'startAngle', [-180, 180, 1], -60, (v) => (sector.startAngle = v), 8);
  drive(stage, 'endAngle', [-180, 180, 1], 180, (v) => (sector.endAngle = v), 5);

  return stage.dispose;
};

export default mount;
