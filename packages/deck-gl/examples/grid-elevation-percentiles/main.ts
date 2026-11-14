// GridLayer elevationRange and elevation percentiles
import { Deck } from '@deck.gl/core';
import { GridLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Opts {
  rangeMax: number;
  lower: number;
  upper: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 55, bearing: 15 });

  const grid = (o: Opts): GridLayer<Spot> =>
    new GridLayer<Spot>({
      id: 'grid',
      data,
      getPosition: (d) => d.position,
      cellSize: ctx.preview ? 50000 : 20000,
      extruded: true,
      elevationRange: [0, o.rangeMax], // metres for the lowest and highest cell
      elevationLowerPercentile: o.lower, // cells below this elevation percentile are hidden
      elevationUpperPercentile: o.upper,
      elevationScale: 40,
    });

  const o: Opts = { rangeMax: 1000, lower: 0, upper: 100 };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), grid(o)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), grid({ rangeMax: 1000, lower: (1 + Math.sin(t * 0.9)) * 35, upper: 100 })], viewState: { ...view, bearing: 15 + t * 4 } }));
  } else {
    const refresh = (): void => deck.setProps({ layers: [landLayer(), grid({ ...o })] });
    const bar = controlBar(el);
    slider(bar, 'elevationRange max', 100, 3000, 100, o.rangeMax, (v) => ((o.rangeMax = v), refresh()));
    slider(bar, 'elevationLowerPercentile', 0, 100, 1, o.lower, (v) => ((o.lower = v), refresh()));
    slider(bar, 'elevationUpperPercentile', 0, 100, 1, o.upper, (v) => ((o.upper = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
