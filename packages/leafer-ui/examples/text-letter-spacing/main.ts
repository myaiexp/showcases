// Text: letterSpacing in px or percent
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the value and switch between px and percent.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 10, y: stage.height / 2 - 20, width: stage.width - 20, text: 'Spacing', fill: '#333', fontSize: stage.preview ? 24 : 40, textAlign: 'center' });
  leafer.add(text);
  const state = { unit: 'px' as 'px' | 'percent', v: 0 };
  const apply = (): void => {
    text.letterSpacing = state.unit === 'px' ? state.v : { type: 'percent', value: state.v / 20 };
  };
  pick(stage, 'unit', ['px', 'percent'] as const, (u) => ((state.unit = u), apply()), 3500);
  drive(stage, 'value', [-4, 20, 1], 0, (v) => ((state.v = v), apply()), 4);

  return stage.dispose;
};

export default mount;
