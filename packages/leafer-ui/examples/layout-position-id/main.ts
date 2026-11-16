// Layout: position relative to another element by id
import { Box, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/position'; // the position plugin
import '@leafer-in/find'; // position: { id } looks the element up with the find plugin
import type { IInset } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const FORMS: Record<string, IInset> = {
  "{ id: 'target', align: 'center' }": { id: 'target', align: 'center' },
  "{ id: 'target', align: 'top-right' }": { id: 'target', align: 'top-right' },
  "{ id: 'target', top: 10, left: 10, right: 10, bottom: 10 }": { id: 'target', top: 10, left: 10, right: 10, bottom: 10 },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The green rect follows the blue "target" rect (drag it) by its id, not by the parent.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const B = size(stage) * 1.5;
  const parent = new Box({ ...mid(stage, B, B * 0.7), y: 10, width: B, height: B * 0.7, fill: '#FF4A2C' });
  const T = B * 0.32;
  const target = new Rect({ id: 'target', x: B * 0.15, y: B * 0.1, width: T, height: T, fill: '#4B8BFF', draggable: true });
  const follower = new Rect({ width: T * 0.4, height: T * 0.4, fill: '#32cd79', hittable: false });
  parent.add([target, follower]);
  leafer.add(parent);
  const show = label(stage, '', true);
  let form = '';
  const note = (): void => show(`follower.position = ${form}\nx ${Math.round(follower.x!)}  y ${Math.round(follower.y!)}  width ${Math.round(follower.width!)}  height ${Math.round(follower.height!)}`);
  pick(stage, 'position', Object.keys(FORMS), (name) => {
    form = name;
    follower.set({ width: T * 0.4, height: T * 0.4 });
    follower.position = FORMS[name]!;
    stage.after(80, note); // the plugin lays out on the next frame
  }, 2600);
  if (stage.preview) {
    stage.loop((_dt, t) => {
      target.set({ x: B * 0.45 + Math.sin(t * 1.2) * B * 0.3, y: B * 0.2 + Math.cos(t * 0.9) * B * 0.08 });
      note();
    });
  }

  return stage.dispose;
};

export default mount;
