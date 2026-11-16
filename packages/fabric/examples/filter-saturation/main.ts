// Image filters: Saturation slider from washed out to over-saturated
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'fruit');
  const say = status(stage);

  // saturation: -1 pulls every colour towards its brightest channel, positive values push apart.
  const saturation = new filters.Saturation({ saturation: 0.6 });
  const set = (v: number): void => {
    saturation.saturation = v;
    show([saturation]);
    say(`Saturation({ saturation: ${v.toFixed(2)} })`);
  };
  set(0.6);

  if (stage.bar) slider(stage.bar, 'saturation', -1, 1, 0.01, 0.6, set, (v) => v.toFixed(2));
  else sweep(stage, -1, 1, set);
  return stage.dispose;
};

export default mount;
