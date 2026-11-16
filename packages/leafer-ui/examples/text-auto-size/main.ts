// Text: isAutoWidth and isAutoHeight
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle fixed width.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 30, y: 30, text: 'An auto-sized text, then wrapped.', fill: '#333', fontSize: stage.preview ? 15 : 22 });
  const frame = new Rect({ x: 30, y: 30, hittable: false, stroke: '#32cd79', strokeWidth: 1, dashPattern: [4, 4] });
  leafer.add([frame, text]);
  const note = caption(stage, leafer);
  toggle(stage, 'fixed width', false, (v) => {
    text.width = v ? 140 : undefined;
    frame.set({ width: text.width, height: text.height });
    note.text = `isAutoWidth ${text.isAutoWidth}, isAutoHeight ${text.isAutoHeight}`;
  }, 1800);

  return stage.dispose;
};

export default mount;
