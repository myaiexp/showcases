// Data: toJSON and toString with the matrix option
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'toJSON({ matrix: true }) adds the transform matrix next to x, y, rotation.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const rect = new Rect({ ...mid(stage, S, S), y: 14, width: S, height: S, fill: '#32cd79', around: 'center' });
  rect.x = stage.width / 2;
  rect.y = 14 + S / 2;
  leafer.add(rect);
  const show = label(stage, '', true);
  let matrix = false;
  const refresh = (): void => show(`rect.toString({ matrix: ${matrix} })\n${rect.toString({ matrix })}`);
  toggle(stage, 'matrix', matrix, (v) => ((matrix = v), refresh()), 2400);
  drive(stage, 'rotation', [0, 90, 1], 30, (v) => ((rect.rotation = v), refresh()), 6);

  return stage.dispose;
};

export default mount;
