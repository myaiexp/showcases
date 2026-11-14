// HeatmapLayer weightsTextureSize and debounceTimeout
import { Deck } from '@deck.gl/core';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const SIZES = ['64', '128', '256', '512', '1024', '2048'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 5000);
  const view = europeView(ctx.preview);

  const heat = (weightsTextureSize: number, debounceTimeout: number): HeatmapLayer<Spot> =>
    new HeatmapLayer<Spot>({
      id: 'heatmap',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      radiusPixels: ctx.preview ? 14 : 35,
      weightsTextureSize, // small textures aggregate faster but look pixelated
      debounceTimeout, // ms after the last view change before re-aggregating
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), heat(2048, 500)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Step the texture down through its sizes.
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), heat(Number(SIZES[5 - (++i % SIZES.length)]), 0)] }), 1500);
    stop = () => clearInterval(timer);
  } else {
    let [size, debounce] = [2048, 500];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), heat(size, debounce)] });
    const bar = controlBar(el);
    select(bar, 'weightsTextureSize', SIZES, (v) => ((size = Number(v)), refresh()), '2048');
    slider(bar, 'debounceTimeout (ms)', 0, 2000, 50, debounce, (v) => ((debounce = v), refresh()));
    readout(el, 'Low sizes pixelate the blobs. Pan or zoom: with a debounce the old heatmap stays until the timeout ends.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
