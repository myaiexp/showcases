// Image filters: Invert with its invert and alpha options as checkboxes
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { checkbox } from '../../shared/controls.ts';
import { filterStage, shot, cycle } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'fruit');
  const say = status(stage);

  // invert turns the filter on or off (false makes it neutral, so applyFilters skips it);
  // alpha also inverts transparency, so this opaque picture turns see-through.
  const invert = new filters.Invert({ invert: true, alpha: false });
  const update = (): void => {
    show([invert]);
    say(`Invert({ invert: ${invert.invert}, alpha: ${invert.alpha} })`);
  };
  update();

  if (stage.bar) {
    checkbox(stage.bar, 'invert', true, (v) => {
      invert.invert = v;
      update();
    });
    checkbox(stage.bar, 'alpha', false, (v) => {
      invert.alpha = v;
      update();
    });
  } else {
    const steps = [
      [true, false],
      [false, false],
      [true, true],
    ] as const;
    cycle(stage, steps, ([inv, alpha]) => {
      invert.invert = inv;
      invert.alpha = alpha;
      update();
    }, 1200);
  }
  return stage.dispose;
};

export default mount;
