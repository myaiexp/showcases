// dragBounds: restricting a drag to an explicit box
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { dragToAndFro } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the square anywhere: it stays in the dashed box. Resize the box with the slider.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const box = { x: 30, y: 30, width: stage.width - 60, height: stage.height - 60 };
  const outline = new Rect({ ...box, stroke: '#999', strokeWidth: 2, dashPattern: [6, 5], hittable: false });
  const s = stage.preview ? 40 : 60;
  const square = new Rect({ x: box.x + 10, y: box.y + 10, width: s, height: s, fill: GREEN, cornerRadius: 8, draggable: true, dragBounds: box });
  leafer.add([outline, square]);

  if (stage.bar) {
    slider(stage.bar, 'box width', 120, stage.width - 60, 2, box.width, (w) => {
      box.width = w;
      outline.width = w;
      square.dragBounds = { ...box }; // set a fresh object: the box is read when a drag starts
    });
  } else {
    dragToAndFro(stage, leafer, { x: square.x! + s / 2, y: square.y! + s / 2 }, { x: stage.width - 6, y: stage.height - 4 });
  }
  return stage.dispose;
};

export default mount;
