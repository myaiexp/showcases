// Image filters: Vibrance slider, a gentler saturation that spares skin tones
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'portrait');
  const say = status(stage);

  const vibrance = new filters.Vibrance({ vibrance: 0.8 });
  const set = (v: number): void => {
    vibrance.vibrance = v;
    show([vibrance]);
    say(`Vibrance({ vibrance: ${v.toFixed(2)} })`);
  };
  set(0.8);

  if (stage.bar) slider(stage.bar, 'vibrance', -1, 1, 0.01, 0.8, set, (v) => v.toFixed(2));
  else sweep(stage, -1, 1, set);
  return stage.dispose;
};

export default mount;
