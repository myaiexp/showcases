// Data: data is a free object the engine never touches
import { Ellipse, Leafer, PointerEvent, Rect, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { lineUp } from '../../shared/layout-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tap a shape to read its data. "new data" assigns a fresh object: data must be replaced, not edited.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = stage.preview ? 50 : 80;
  const items = [
    new Rect({ width: S, height: S, fill: '#32cd79', data: { label: 'order', price: 12 } }),
    new Ellipse({ width: S, height: S, fill: '#FEB027', data: { label: 'tip', price: 3 } }),
    new Star({ width: S, height: S, fill: '#FF4B4B', data: { label: 'gift', price: 0 } }),
  ];
  lineUp(stage, leafer, items);
  const note = caption(stage, leafer);
  note.text = 'tap a shape';
  const read = (ui: { tag: string; data: object }): void => void (note.text = `${ui.tag}.data = ${JSON.stringify(ui.data)}`);
  leafer.on(PointerEvent.TAP, (e: PointerEvent) => {
    if (e.target !== leafer) read(e.target as never);
  });
  let n = 0;
  if (stage.bar) {
    button(stage.bar, 'new data', () => {
      items[0]!.data = { label: 'order', price: 12 + ++n }; // assign a new object
      read(items[0]!);
    });
  } else {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      for (const it of items) {
        await ghost.tap(it.x! + S / 2, it.y! + S / 2, { glide: 500 });
        await stage.wait(800);
      }
    });
  }

  return stage.dispose;
};

export default mount;
