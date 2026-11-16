// Path: read an element's path data
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide corners and read the numbers.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, corners: 4, fill: '#32cd79' });
  leafer.add(star);
  const note = caption(stage, leafer);
  note.width = stage.width - 20;
  note.x = 10;
  note.y = stage.height - (stage.preview ? 40 : 56);
  drive(stage, 'corners', [3, 6, 1], 4, (v) => {
    star.corners = v;
    const text = star.getPathString();
    note.text = `${text.slice(0, stage.preview ? 56 : 110)}...`;
  }, 6);

  return stage.dispose;
};

export default mount;
