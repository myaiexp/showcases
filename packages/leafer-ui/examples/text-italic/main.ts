// Text: italic on and off
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle italic.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 20, y: stage.height / 2 - 30, width: stage.width - 40, text: 'Leafer', fill: '#333', fontSize: stage.preview ? 44 : 70, textAlign: 'center', fontFamily: 'serif' });
  leafer.add(text);
  toggle(stage, 'italic', true, (v) => (text.italic = v), 1300);

  return stage.dispose;
};

export default mount;
