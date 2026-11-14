// HeatmapLayer: radiusPixels, intensity and threshold
import { Deck } from '@deck.gl/core';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Look {
  radiusPixels: number;
  intensity: number;
  threshold: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);

  const heat = (l: Look): HeatmapLayer<Spot> =>
    new HeatmapLayer<Spot>({
      id: 'heatmap',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      radiusPixels: l.radiusPixels, // circle each point spreads its weight over
      intensity: l.intensity, // multiplies the summed weight at each pixel
      threshold: l.threshold, // fraction of the max weight that fades to transparent
    });

  const look: Look = { radiusPixels: ctx.preview ? 14 : 30, intensity: 1, threshold: 0.05 };
  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), heat(look)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), heat({ ...look, intensity: 0.5 + (1 + Math.sin(t * 1.2)) * 0.9, threshold: 0.03 + (1 + Math.cos(t * 0.8)) * 0.1 })] }));
  } else {
    const refresh = (): void => deck.setProps({ layers: [landLayer(), heat({ ...look })] });
    const bar = controlBar(el);
    slider(bar, 'radiusPixels', 5, 100, 1, look.radiusPixels, (v) => ((look.radiusPixels = v), refresh()));
    slider(bar, 'intensity', 0.1, 5, 0.1, look.intensity, (v) => ((look.intensity = v), refresh()));
    slider(bar, 'threshold', 0, 0.5, 0.01, look.threshold, (v) => ((look.threshold = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
