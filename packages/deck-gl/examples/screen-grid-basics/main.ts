// ScreenGridLayer: screen-space bins; cellSizePixels and opacity
import { Deck } from '@deck.gl/core';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview);

  const screenGrid = (cellSizePixels: number, opacity: number): ScreenGridLayer<Spot> =>
    new ScreenGridLayer<Spot>({
      id: 'screen-grid',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSizePixels, // unit width and height of a bin, in screen pixels
      opacity,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), screenGrid(ctx.preview ? 16 : 40, 0.85)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Panning moves the points through fixed screen cells, so the counts change as it drifts.
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: view.longitude + Math.sin(t * 0.5) * 3, latitude: view.latitude + Math.cos(t * 0.4) * 1.5 } }));
  } else {
    let [size, opacity] = [40, 0.85];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), screenGrid(size, opacity)] });
    const bar = controlBar(el);
    slider(bar, 'cellSizePixels', 8, 100, 2, size, (v) => ((size = v), refresh()));
    slider(bar, 'opacity', 0.1, 1, 0.05, opacity, (v) => ((opacity = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
