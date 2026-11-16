// Text: paraIndent and paraSpacing
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide both values.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 20, y: 12, width: stage.width - 40, text: 'First paragraph of a few words that wraps.\nSecond paragraph, also long enough to wrap onto a second line.', fill: '#333', fontSize: stage.preview ? 13 : 20 });
  leafer.add(text);
  drive(stage, 'paraIndent', [0, 60, 1], 20, (v) => (text.paraIndent = v), 5);
  drive(stage, 'paraSpacing', [0, 30, 1], 10, (v) => (text.paraSpacing = v), 7);

  return stage.dispose;
};

export default mount;
