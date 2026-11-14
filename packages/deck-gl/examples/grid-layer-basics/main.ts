// GridLayer: points binned into square cells, with cellSize and elevationScale
import { Deck } from '@deck.gl/core';
import { GridLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 50, bearing: -12 });

  const grid = (cellSize: number, elevationScale: number): GridLayer<Spot> =>
    new GridLayer<Spot>({
      id: 'grid',
      data,
      getPosition: (d) => d.position,
      // Weights default to 1, so colour and height both show the point count.
      cellSize, // metres
      elevationScale,
      extruded: true,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), grid(ctx.preview ? 50000 : 20000, 40)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), grid(50000, 15 + (1 + Math.sin(t * 1.2)) * 25)], viewState: { ...view, bearing: -12 + t * 5 } }));
  } else {
    let [cell, scale] = [20000, 40];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), grid(cell, scale)] });
    const bar = controlBar(el);
    slider(bar, 'cellSize (m)', 5000, 60000, 1000, cell, (v) => ((cell = v), refresh()));
    slider(bar, 'elevationScale', 0, 150, 5, scale, (v) => ((scale = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
