// Layout: position as an alignment name inside a Box
import { Box, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/position'; // the position plugin
import type { IAlign } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const ALIGNS: IAlign[] = ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'center'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'position takes a direction name; the plugin works out x and y against the parent Box.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const B = size(stage) * 1.2;
  const parent = new Box({ ...mid(stage, B, B * 0.7), y: 10, width: B, height: B * 0.7, fill: '#FF4A2C' });
  const rect = new Rect({ width: B * 0.25, height: B * 0.25, fill: '#32cd79' });
  parent.add(rect);
  leafer.add(parent);
  const show = label(stage, '', true);
  pick(stage, 'position', ALIGNS, (a) => {
    rect.position = a;
    show(`rect.position = '${a}'`);
    stage.after(80, () => show(`rect.position = '${a}'\nx ${Math.round(rect.x!)}  y ${Math.round(rect.y!)}`)); // laid out on the next frame
  }, 1000, 'top-left');

  return stage.dispose;
};

export default mount;
