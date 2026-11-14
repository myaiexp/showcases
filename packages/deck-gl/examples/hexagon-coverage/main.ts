// HexagonLayer coverage: smaller hexagons, same binning
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 45 });

  const hexagons = (coverage: number, extruded: boolean): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      radius: ctx.preview ? 55000 : 25000,
      coverage, // displayed radius = coverage * radius, clamped to 0..1
      extruded,
      elevationScale: 35,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(0.7, true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), hexagons(0.35 + (1 + Math.sin(t * 1.3)) * 0.3, true)], viewState: { ...view, bearing: t * 5 } }));
  } else {
    let [coverage, extruded] = [0.7, true];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), hexagons(coverage, extruded)] });
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
