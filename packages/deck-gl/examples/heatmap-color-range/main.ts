// HeatmapLayer colorRange: palettes, including colours with alpha
import { Deck } from '@deck.gl/core';
import type { Color } from '@deck.gl/core';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { RAMPS, europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** A ramp whose colours fade in through [r, g, b, a]: low weights stay see-through. */
const PALETTES: Record<string, Color[]> = {
  ...RAMPS,
  'Glow (with alpha)': [[255, 255, 255, 0], [120, 200, 255, 70], [60, 140, 255, 140], [190, 90, 255, 200], [255, 60, 160, 235], [255, 255, 255, 255]],
};
const names = Object.keys(PALETTES);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);

  const heat = (palette: string): HeatmapLayer<Spot> =>
    new HeatmapLayer<Spot>({
      id: 'heatmap',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      radiusPixels: ctx.preview ? 14 : 35,
      colorRange: PALETTES[palette],
    });

  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), heat(names[0]!)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), heat(names[++i % names.length]!)] }), 1600);
    stop = () => clearInterval(timer);
  } else {
    select(controlBar(el), 'colorRange', names, (v) => deck.setProps({ layers: [landLayer(), heat(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
