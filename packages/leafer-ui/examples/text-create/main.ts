// Text: text, fill and fontSize
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide fontSize; drag the text to move it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ ...mid(stage, 200, 30), text: 'Welcome to LeaferJS', fill: '#32cd79', fontSize: 20, draggable: true });
  leafer.add(text);
  drive(stage, 'fontSize', [10, 60, 1], 20, (v) => {
    text.fontSize = v;
    text.set(mid(stage, text.width!, text.height!));
  }, 4);

  return stage.dispose;
};

export default mount;
