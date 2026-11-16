// Box: no width and height adapts to children
import { Box, Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the text length: the Box grows and shrinks around it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const box = new Box({
    x: 14, y: stage.height / 2 - 24, fill: '#FF4B4B', cornerRadius: 20, draggable: true,
    children: [{ tag: 'Text', text: 'Welcome to LeaferJS', fill: 'black', padding: [10, 20], textAlign: 'left', verticalAlign: 'top', fontSize: stage.preview ? 13 : 22 }],
  });
  leafer.add(box);
  const text = box.children[0] as Text;
  const note = caption(stage, leafer);
  drive(stage, 'words', [1, 5, 1], 3, (v) => {
    text.text = ['Welcome', 'to', 'LeaferJS', 'canvas', 'UI'].slice(0, v).join(' ');
    leafer.nextRender(() => (note.text = `isAutoWidth ${box.isAutoWidth}, width ${Math.round(box.width!)}`));
  }, 6);

  return stage.dispose;
};

export default mount;
