// Image filters: BlackWhite, Brownie, Vintage and Sepia presets
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { cycle, filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  // Each preset is a ready-made ColorMatrix subclass: new filters.Vintage() needs no options.
  const presets = [
    ['original', null],
    ['BlackWhite', () => new filters.BlackWhite()],
    ['Brownie', () => new filters.Brownie()],
    ['Vintage', () => new filters.Vintage()],
    ['Sepia', () => new filters.Sepia()],
  ] as const;
  const stage = filterStage(el, ctx, ctx.preview ? undefined : presets.map(([name]) => name), 'The same portrait through each preset');
  const say = status(stage);

  const shots = stage.panes.map((pane) => shot(stage, 'portrait', pane));
  if (stage.preview) {
    const apply = (i: number): void => {
      const make = presets[i]![1];
      shots[0]!.show(make ? [make()] : []);
      say(presets[i]![0]);
    };
    apply(0);
    cycle(stage, [0, 1, 2, 3, 4], apply, 1200);
  } else {
    presets.forEach(([, make], i) => shots[i]!.show(make ? [make()] : []));
  }
  return stage.dispose;
};

export default mount;
