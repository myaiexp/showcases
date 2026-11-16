// Text: textCase title, upper, lower
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a case.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 20, y: stage.height / 2 - 20, width: stage.width - 40, text: 'welcome to LeaferJS ui', fill: '#32cd79', fontSize: stage.preview ? 18 : 28, textAlign: 'center' });
  leafer.add(text);
  const note = caption(stage, leafer);
  pick(stage, 'textCase', ['none', 'title', 'upper', 'lower'] as const, (v) => {
    text.textCase = v;
    note.text = `textCase: '${v}'`;
  }, 1300);

  return stage.dispose;
};

export default mount;
