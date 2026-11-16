// Path: a path as a number array
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the apex: the numbers in the caption change with it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const path = new Path({ ...mid(stage, S), scale: k, fill: '#32cd79' });
  leafer.add(path);
  const note = caption(stage, leafer);
  drive(stage, 'apex x', [0, 100, 1], 100, (v) => {
    const data = [1, 0, 0, 2, v, 100, 2, 0, 100, 11];
    path.path = data;
    note.text = `[${data.join(', ')}]`;
  }, 4);

  return stage.dispose;
};

export default mount;
