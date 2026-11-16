// Image filters: Blur with a slider; a value from 0 to 1
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'city');
  const say = status(stage);

  // blur is relative to the image, not in pixels: 1 smears over about 12% of the shorter side.
  const blur = new filters.Blur({ blur: 0.4 });
  const set = (v: number): void => {
    blur.blur = v;
    show([blur]);
    say(`Blur({ blur: ${v.toFixed(2)} })`);
  };
  set(0.4);

  if (stage.bar) slider(stage.bar, 'blur', 0, 1, 0.01, 0.4, set, (v) => v.toFixed(2));
  else sweep(stage, 0, 0.8, set);
  return stage.dispose;
};

export default mount;
