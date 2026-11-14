// GridLayer coverage and extruded: smaller cells, or a flat grid
import { Deck } from '@deck.gl/core';
import { GridLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 45 });

  const grid = (coverage: number, extruded: boolean): GridLayer<Spot> =>
    new GridLayer<Spot>({
      id: 'grid',
      data,
      getPosition: (d) => d.position,
      cellSize: ctx.preview ? 50000 : 20000,
      coverage, // cell side multiplier, 0..1; binning is unchanged
      extruded, // GridLayer extrudes by default
      elevationScale: 35,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), grid(0.8, true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), grid(0.3 + (1 + Math.sin(t * 1.3)) * 0.35, true)], viewState: { ...view, bearing: t * 5 } }));
  } else {
    let [coverage, extruded] = [0.8, true];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), grid(coverage, extruded)] });
    const bar = controlBar(el);
    slider(bar, 'coverage', 0, 1, 0.05, coverage, (v) => ((coverage = v), refresh()));
    check(bar, 'extruded', extruded, (v) => ((extruded = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
