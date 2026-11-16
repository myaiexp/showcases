// Text: padding with one to four numbers
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a padding form.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ ...mid(stage, 120, 40), text: 'Padding', fill: 'black', fontSize: stage.preview ? 18 : 26, boxStyle: { fill: '#32cd79' }, textAlign: 'center' });
  leafer.add(text);
  const note = caption(stage, leafer);
  const forms: Record<string, number | number[]> = { '20': 20, '[20, 10]': [20, 10], '[20, 10, 20]': [20, 10, 20], '[20, 10, 20, 10]': [20, 10, 20, 10], '[0, 40, 0, 0]': [0, 40, 0, 0] };
  pick(stage, 'padding', Object.keys(forms), (k) => {
    text.padding = forms[k];
    leafer.nextRender(() => text.set(mid(stage, text.width!, text.height!)));
    note.text = `padding: ${k}`;
  }, 1500);

  return stage.dispose;
};

export default mount;
