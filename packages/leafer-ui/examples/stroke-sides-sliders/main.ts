// Stroke sides: each side of strokeWidth moved separately
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each slider is one entry of the strokeWidth array.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '');

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S * 1.3, S), width: S * 1.3, height: S, fill: '#ffe28a', stroke: '#c0392b' });
  leafer.add(rect);

  const w = [10, 20, 30, 40];
  const apply = (): void => {
    rect.strokeWidth = [...w];
    say(`strokeWidth: [${w.join(', ')}]`);
  };
  if (stage.bar) {
    (['top', 'right', 'bottom', 'left'] as const).forEach((name, i) =>
      slider(stage.bar!, name, 0, 40, 1, w[i]!, (v) => ((w[i] = v), apply())),
    );
    apply();
  } else {
    stage.loop((_dt, t) => {
      for (let i = 0; i < 4; i++) w[i] = Math.round(20 + 18 * Math.sin(t * (0.7 + i * 0.25) + i));
      apply();
    });
  }

  return stage.dispose;
};

export default mount;
