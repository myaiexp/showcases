// Path: SVG and canvas commands in one string
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the corner radius written into the string.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const path = new Path({ ...mid(stage, S), scale: S / 100, windingRule: 'evenodd', path: 'X0 0 100 100 30M75 50P50 50 25', fill: '#32cd79' });
  leafer.add(path);
  const note = caption(stage, leafer);
  drive(stage, 'X radius', [0, 50, 1], 30, (v) => {
    path.path = `X0 0 100 100 ${v}M75 50P50 50 25`;
    note.text = String(path.path);
  }, 4);

  return stage.dispose;
};

export default mount;
