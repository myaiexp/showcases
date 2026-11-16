// Image filters: Pixelate blocksize slider turns the picture into big squares
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'portrait');
  const say = status(stage);

  // blocksize is the square's side in image pixels; 1 is neutral, so applyFilters skips it.
  const pixelate = new filters.Pixelate({ blocksize: 12 });
  const set = (v: number): void => {
    pixelate.blocksize = v;
    show([pixelate]);
    say(`Pixelate({ blocksize: ${v} })`);
  };
  set(12);

  if (stage.bar) slider(stage.bar, 'blocksize', 1, 48, 1, 12, set);
  else sweep(stage, 2, 30, (v) => set(Math.round(v)));
  return stage.dispose;
};

export default mount;
