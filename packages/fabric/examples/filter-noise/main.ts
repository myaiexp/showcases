// Image filters: Noise adds film grain, with a slider for its strength
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'portrait');
  const say = status(stage);

  // noise is the peak grain in 0..255 colour steps; each applyFilters() draws fresh random grain.
  const noise = new filters.Noise({ noise: 150 });
  const set = (v: number): void => {
    noise.noise = v;
    show([noise]);
    say(`Noise({ noise: ${Math.round(v)} })`);
  };
  set(150);

  if (stage.bar) slider(stage.bar, 'noise', 0, 700, 1, 150, set);
  else sweep(stage, 40, 500, set, 2.5);
  return stage.dispose;
};

export default mount;
