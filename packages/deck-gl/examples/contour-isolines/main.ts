// ContourLayer isolines: lines at single thresholds
import { Deck } from '@deck.gl/core';
import { ContourLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 1200 : 4000);

  const contour = (cellSize: number, strokeWidth: number, scale = 1): ContourLayer<Spot> =>
    new ContourLayer<Spot>({
      id: 'contours',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSize, // metres
      // A single-number threshold makes an isoline; each one has its own colour and width.
      contours: [
        { threshold: 32 * scale, color: [90, 200, 255], strokeWidth },
        { threshold: 80 * scale, color: [120, 255, 160], strokeWidth },
        { threshold: 160 * scale, color: [255, 220, 90], strokeWidth },
        { threshold: 260 * scale, color: [255, 90, 90], strokeWidth },
      ],
    });

  const size = ctx.preview ? 40000 : 30000;
  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), contour(size, ctx.preview ? 2 : 3, ctx.preview ? 0.5 : 1)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), contour(40000, 1 + (1 + Math.sin(t * 1.5)) * 2, 0.5)] }));
  } else {
    let [cell, width] = [30000, 3];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), contour(cell, width, (cell / 30000) ** 2)] });
    const bar = controlBar(el);
    slider(bar, 'cellSize (m)', 10000, 60000, 2000, cell, (v) => ((cell = v), refresh()));
    slider(bar, 'strokeWidth', 1, 8, 1, width, (v) => ((width = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
