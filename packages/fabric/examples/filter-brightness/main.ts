// Image filters: Brightness with a slider, as one filters.Brightness
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'landscape');
  const say = status(stage);

  // One filter instance; changing its `brightness` (-1 to 1) and calling applyFilters() redoes the pixels.
  const brightness = new filters.Brightness({ brightness: 0.3 });
  const set = (v: number): void => {
    brightness.brightness = v;
    show([brightness]);
    say(`Brightness({ brightness: ${v.toFixed(2)} })`);
  };
  set(0.3);

  if (stage.bar) slider(stage.bar, 'brightness', -1, 1, 0.01, 0.3, set, (v) => v.toFixed(2));
  else sweep(stage, -0.6, 0.6, set);
  return stage.dispose;
};

export default mount;
