// Text: placeholder text when empty
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle filled.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ ...mid(stage, 240, 30), fill: '#32cd79', fontSize: 20, placeholder: 'Type something here', placeholderColor: 'rgba(120,120,120,0.5)' });
  leafer.add(text);
  toggle(stage, 'filled', false, (v) => text.set({ text: v ? 'Welcome to LeaferJS' : '' }), 1500);

  return stage.dispose;
};

export default mount;
