// Image filters: the same two filters in two orders give two different pictures
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { color, select, slider } from '../../shared/controls.ts';
import { cycle, filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const names = ['Grayscale, then BlendColor', 'BlendColor, then Grayscale'];
  const stage = filterStage(el, ctx, ctx.preview ? undefined : names, 'Filters run in array order, each on the output of the one before');
  const say = status(stage);
  const shots = stage.panes.map((pane) => shot(stage, 'fruit', pane));

  const gray = new filters.Grayscale({ mode: 'luminosity' });
  const blend = new filters.BlendColor({ color: '#e0457b', mode: 'multiply', alpha: 1 });
  // Same two instances, two arrays. Grayscale first leaves a tinted mono picture; the other order
  // multiplies the colour in and then drains it, which keeps only the brightness.
  const orders = [[gray, blend], [blend, gray]];
  const update = (): void => {
    if (stage.bar) shots.forEach((s, i) => s.show(orders[i]!));
  };
  update();

  if (stage.bar) {
    select(stage.bar, 'blend mode', ['multiply', 'add', 'screen', 'difference', 'tint', 'overlay'] as const, (m) => {
      blend.mode = m;
      update();
    });
    color(stage.bar, 'colour', '#e0457b', (v) => {
      blend.color = v;
      update();
    });
    slider(stage.bar, 'alpha', 0, 1, 0.01, 1, (v) => {
      blend.alpha = v;
      update();
    }, (v) => v.toFixed(2));
  } else {
    blend.mode = 'tint';
    blend.alpha = 0.7;
    const apply = (i: number): void => {
      shots[0]!.show(orders[i]!);
      say(names[i]!);
    };
    apply(0);
    cycle(stage, [0, 1], apply, 1600);
  }
  return stage.dispose;
};

export default mount;
