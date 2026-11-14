// HexagonLayer colorScaleType: linear, quantize, quantile, ordinal
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type ScaleType = 'linear' | 'quantize' | 'quantile' | 'ordinal';
const SCALES: readonly ScaleType[] = ['quantize', 'linear', 'quantile', 'ordinal'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);

  const hexagons = (colorScaleType: ScaleType): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      radius: ctx.preview ? 55000 : 25000,
      extruded: false,
      colorScaleType,
      colorRange: [[255, 255, 178], [254, 217, 118], [254, 178, 76], [253, 141, 60], [240, 59, 32], [189, 0, 38]],
    });

  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), hexagons('quantize')] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Cycle the four scale types: quantile and ordinal spread the colours far more evenly.
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), hexagons(SCALES[++i % SCALES.length]!)] }), 1600);
    stop = () => clearInterval(timer);
  } else {
    select(controlBar(el), 'colorScaleType', SCALES, (v) => deck.setProps({ layers: [landLayer(), hexagons(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
