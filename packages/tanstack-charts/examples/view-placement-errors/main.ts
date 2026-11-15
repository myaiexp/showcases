// composeViews rejects missing, unknown and duplicate view placements at runtime
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { composeViews, fill, grid, layer } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel } from '../../shared/xform-table.ts';

const tile = defineChart({
  marks: [barY([{ q: 'a', v: 3 }, { q: 'b', v: 5 }], { x: 'q', y: 'v' })],
  scales: { x: { scale: () => scaleBand<string>() }, y: { scale: scaleLinear } },
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each case builds a composition and reports what happened.' });
  const show = readoutPanel(stage);
  const views = { one: tile, two: tile };
  const compose = (layout: unknown) => composeViews({ views, layout: layout as never } as never);

  const cases: readonly (readonly [string, () => unknown])[] = [
    ['view left out', () => compose(fill('one'))],
    ['view placed twice', () => compose(layer(fill('one'), fill('one'), fill('two')))],
    ['unknown view', () => compose(layer(fill('one'), fill('two'), fill('three')))],
    ['valid grid', () => compose(grid({ rows: [{ id: 'r', grow: 1 }], columns: [{ id: 'a', grow: 1 }, { id: 'b', grow: 1 }], cells: { one: { row: 'r', column: 'a' }, two: { row: 'r', column: 'b' } } }))],
  ];
  const run = ([name, build]: readonly [string, () => unknown]): void => {
    try {
      build();
      show(`${name}: composeViews returned a definition`);
      stage.say(`${name}: accepted`);
    } catch (err) {
      show(`${name}:\n${(err as Error).message}`);
      stage.say(`${name}: ${(err as Error).message}`);
    }
  };
  if (stage.bar) for (const c of cases) button(stage.bar, c[0], () => run(c));
  stage.cycle(cases, 1800, run);
  return () => stage.dispose();
};

export default mount;
