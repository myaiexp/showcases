// Image filters: Gamma with one slider per colour channel
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'landscape');
  const say = status(stage);

  // gamma is a [r, g, b] triple (1 = unchanged). Values above 1 lighten the midtones.
  const gamma = new filters.Gamma({ gamma: [1.6, 1, 0.7] });
  const update = (): void => {
    show([gamma]);
    say(`Gamma [${gamma.gamma.map((g) => g.toFixed(2)).join(', ')}]`);
  };
  update();

  if (stage.bar) {
    (['red', 'green', 'blue'] as const).forEach((name, i) => {
      slider(stage.bar!, name, 0.2, 2.5, 0.01, gamma.gamma[i]!, (v) => {
        gamma.gamma[i] = v;
        update();
      }, (v) => v.toFixed(2));
    });
  } else {
    sweep(stage, 0.5, 2, (v) => {
      gamma.gamma = [v, 1, 2.5 - v];
      update();
    });
  }
  return stage.dispose;
};

export default mount;
