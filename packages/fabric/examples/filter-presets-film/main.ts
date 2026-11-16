// Image filters: the Kodachrome, Technicolor and Polaroid colour-matrix presets
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { cycle, filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  // Film-look presets: each is a ColorMatrix subclass registered under its own type name.
  const presets = [
    ['original', null],
    ['Kodachrome', () => new filters.Kodachrome()],
    ['Technicolor', () => new filters.Technicolor()],
    ['Polaroid', () => new filters.Polaroid()],
  ] as const;
  const stage = filterStage(el, ctx, ctx.preview ? undefined : presets.map(([name]) => name), 'The same landscape through each preset');
  const say = status(stage);

  const shots = stage.panes.map((pane) => shot(stage, 'landscape', pane));
  if (stage.preview) {
    const apply = (i: number): void => {
      const make = presets[i]![1];
      shots[0]!.show(make ? [make()] : []);
      say(presets[i]![0]);
    };
    apply(0);
    cycle(stage, [0, 1, 2, 3], apply, 1200);
  } else {
    presets.forEach(([, make], i) => shots[i]!.show(make ? [make()] : []));
  }
  return stage.dispose;
};

export default mount;
