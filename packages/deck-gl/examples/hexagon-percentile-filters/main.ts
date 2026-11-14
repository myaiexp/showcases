// HexagonLayer percentiles: hide the lowest and highest hexagons
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Cut {
  lower: number;
  upper: number;
  elevationLower: number;
  elevationUpper: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 50 });

  const hexagons = (c: Cut): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      getColorWeight: (d) => d.weight,
      getElevationWeight: (d) => d.weight,
      radius: ctx.preview ? 55000 : 25000,
      extruded: true,
      elevationScale: 4,
      lowerPercentile: c.lower, // hexagons with a colour value below this percentile are hidden
      upperPercentile: c.upper,
      elevationLowerPercentile: c.elevationLower,
      elevationUpperPercentile: c.elevationUpper,
    });

  const cut: Cut = { lower: 0, upper: 100, elevationLower: 0, elevationUpper: 100 };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(cut)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), hexagons({ ...cut, lower: (1 + Math.sin(t * 0.9)) * 40, upper: 100 - (1 + Math.cos(t * 0.7)) * 15 })], viewState: { ...view, bearing: t * 4 } }));
  } else {
    const refresh = (): void => deck.setProps({ layers: [landLayer(), hexagons({ ...cut })] });
    const bar = controlBar(el);
    slider(bar, 'lowerPercentile', 0, 100, 1, cut.lower, (v) => ((cut.lower = v), refresh()));
    slider(bar, 'upperPercentile', 0, 100, 1, cut.upper, (v) => ((cut.upper = v), refresh()));
    slider(bar, 'elevationLowerPercentile', 0, 100, 1, cut.elevationLower, (v) => ((cut.elevationLower = v), refresh()));
    slider(bar, 'elevationUpperPercentile', 0, 100, 1, cut.elevationUpper, (v) => ((cut.elevationUpper = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
