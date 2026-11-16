// Image filters: Contrast with a slider, flattening or hardening the tones
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'city');
  const say = status(stage);

  // contrast runs from -1 (flat grey) to 1 (hard black and white); 0 leaves the image alone.
  const contrast = new filters.Contrast({ contrast: 0.4 });
  const set = (v: number): void => {
    contrast.contrast = v;
    show([contrast]);
    say(`Contrast({ contrast: ${v.toFixed(2)} })`);
  };
  set(0.4);

  if (stage.bar) slider(stage.bar, 'contrast', -1, 1, 0.01, 0.4, set, (v) => v.toFixed(2));
  else sweep(stage, -0.8, 0.8, set);
  return stage.dispose;
};

export default mount;
