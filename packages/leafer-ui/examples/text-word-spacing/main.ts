// Text: wordSpacing between words
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide wordSpacing.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 10, y: stage.height / 2 - 20, width: stage.width - 20, text: 'one two three four', fill: '#333', fontSize: stage.preview ? 18 : 30, textAlign: 'center', textWrap: 'none' });
  leafer.add(text);
  drive(stage, 'wordSpacing', [0, 50, 1], 0, (v) => (text.wordSpacing = v), 4);

  return stage.dispose;
};

export default mount;
