// Text: getBounds content gives the glyph box
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the width and pick an alignment.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 30, y: 24, width: stage.width - 60, height: 80, text: 'Content bounds', fill: '#333', fontSize: stage.preview ? 18 : 28, textAlign: 'center', verticalAlign: 'middle' });
  const box = new Rect({ x: 30, y: 24, stroke: '#FF4B4B', strokeWidth: 1, hittable: false });
  const outer = new Rect({ x: 30, y: 24, width: text.width, height: 80, stroke: '#32cd79', strokeWidth: 1, dashPattern: [4, 4], hittable: false });
  leafer.add([outer, text, box]);
  const sync = (): void => {
    const { x, y, width, height } = text.getBounds('content', 'inner');
    box.set({ x: text.x! + x!, y: text.y! + y!, width, height });
  };
  const note = caption(stage, leafer);
  pick(stage, 'textAlign', ['center', 'left', 'right'] as const, (v) => ((text.textAlign = v), leafer.nextRender(sync)), 1600);
  drive(stage, 'width', [80, stage.width - 60, 2], stage.width - 60, (v) => {
    text.width = v;
    outer.width = v;
    leafer.nextRender(sync);
    note.text = `content ${Math.round(box.width!)} x ${Math.round(box.height!)}`;
  }, 6);

  return stage.dispose;
};

export default mount;
