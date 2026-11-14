// ScreenGridLayer cellMarginPixels: the gap between cells
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

  const screenGrid = (cellMarginPixels: number): ScreenGridLayer<Spot> =>
    new ScreenGridLayer<Spot>({
      id: 'screen-grid',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSizePixels: ctx.preview ? 18 : 30,
      cellMarginPixels, // clamped to 0..5
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), screenGrid(2)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), screenGrid((1 + Math.sin(t * 1.5)) * 2.5)] }));
  } else {
    slider(controlBar(el), 'cellMarginPixels', 0, 5, 0.25, 2, (v) => deck.setProps({ layers: [landLayer(), screenGrid(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
