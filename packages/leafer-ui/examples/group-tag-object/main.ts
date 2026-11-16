// Group: create elements from tag objects
import { Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press add to append another tag object.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const tags = ['Rect', 'Ellipse', 'Star', 'Polygon'];
  const colors = ['#32cd79', '#FEB027', '#FF4B4B', '#4B8BFF'];
  const note = caption(stage, leafer);
  let n = 0;
  const add = (): void => {
    if (n === 8) { leafer.clear(); leafer.add(note); n = 0; }
    const s = stage.preview ? 40 : 60;
    leafer.add({
      tag: tags[n % 4], // the class name picks the element
      x: 24 + (n % 4) * (s + 14), y: 30 + Math.floor(n / 4) * (s + 20), width: s, height: s,
      fill: colors[n % 4], draggable: true,
    });
    note.text = `add({ tag: '${tags[n % 4]}', ... })`;
    n++;
  };
  add();
  if (stage.bar) button(stage.bar, 'add', add);
  else stage.every(700, add);

  return stage.dispose;
};

export default mount;
