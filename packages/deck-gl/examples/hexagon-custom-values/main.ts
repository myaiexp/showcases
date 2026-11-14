// HexagonLayer getColorValue and getElevationValue: custom reducers (CPU)
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const METRICS = ['weight spread (max - min)', 'distinct clusters', 'median weight'] as const;
type Metric = (typeof METRICS)[number];

const reducers: Record<Metric, (points: Spot[]) => number> = {
  'weight spread (max - min)': (points) => Math.max(...points.map((p) => p.weight)) - Math.min(...points.map((p) => p.weight)),
  'distinct clusters': (points) => new Set(points.map((p) => p.cluster)).size,
  'median weight': (points) => points.map((p) => p.weight).sort((a, b) => a - b)[points.length >> 1]!,
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 700 : 3000);
  const view = europeView(ctx.preview, { pitch: 50 });

  const hexagons = (metric: Metric): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      // Custom value functions replace the weight and aggregation props, and run on the CPU.
      gpuAggregation: false,
      getColorValue: reducers[metric],
      getElevationValue: (points) => points.length,
      updateTriggers: { getColorValue: [metric] },
      radius: ctx.preview ? 55000 : 25000,
      extruded: true,
      elevationScale: 30,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(METRICS[0])] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), hexagons(METRICS[++i % METRICS.length]!)] }), 1800);
    stop = () => clearInterval(timer);
  } else {
    select(controlBar(el), 'getColorValue', METRICS, (v) => deck.setProps({ layers: [landLayer(), hexagons(v)] }));
    readout(el, 'Height is the point count (getElevationValue: points.length); colour is the chosen reducer.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
