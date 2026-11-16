// Text: underline, strikethrough and coloured lines
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, caption } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a decoration.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 20, y: stage.height / 2 - 20, width: stage.width - 40, text: 'Welcome to LeaferJS', fill: '#333', fontSize: stage.preview ? 18 : 28, textAlign: 'center' });
  leafer.add(text);
  const note = caption(stage, leafer);
  const forms: Record<string, Text['textDecoration']> = {
    "'under'": 'under',
    "'delete'": 'delete',
    "'under-delete'": 'under-delete',
    "{ type: 'under', color: 'red' }": { type: 'under', color: 'red' },
    "{ type: 'under', color: 'red', offset: -2 }": { type: 'under', color: 'red', offset: -2 },
    "'none'": 'none',
  };
  pick(stage, 'textDecoration', Object.keys(forms), (k) => {
    text.textDecoration = forms[k];
    note.text = k;
  }, 1500);

  return stage.dispose;
};

export default mount;
