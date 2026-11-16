// Image filters: RemoveColor makes one colour transparent
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { color, slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'fruit');
  const say = status(stage);

  // Pixels within `distance` (0..1 of the colour range) of `color` get alpha 0. The still life's
  // backdrop is dark violet; the paper behind the canvas shows through where it was.
  const remove = new filters.RemoveColor({ color: '#2e2a3a', distance: 0.12 });
  const update = (): void => {
    show([remove]);
    say(`${remove.color}, distance ${remove.distance.toFixed(2)}`);
  };
  update();

  if (stage.bar) {
    color(stage.bar, 'color', '#2e2a3a', (v) => {
      remove.color = v;
      update();
    });
    slider(stage.bar, 'distance', 0, 0.6, 0.01, 0.12, (v) => {
      remove.distance = v;
      update();
    }, (v) => v.toFixed(2));
  } else {
    sweep(stage, 0, 0.35, (v) => {
      remove.distance = v;
      update();
    });
  }
  return stage.dispose;
};

export default mount;
