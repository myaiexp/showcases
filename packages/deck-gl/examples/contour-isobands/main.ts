// ContourLayer isobands: filled areas between two thresholds, [lower, upper)
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

  const contour = (cellSize: number, shift = 0, k = 1): ContourLayer<Spot> =>
    new ContourLayer<Spot>({
      id: 'contours',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSize,
      // A two-number threshold makes an isoband: values >= threshold[0] and < threshold[1].
      contours: [
        { threshold: [(32 + shift) * k, (80 + shift) * k], color: [40, 120, 200, 150] },
        { threshold: [(80 + shift) * k, (160 + shift) * k], color: [60, 200, 140, 170] },
        { threshold: [(160 + shift) * k, (260 + shift) * k], color: [255, 200, 60, 190] },
        { threshold: [(260 + shift) * k, 4000], color: [240, 70, 70, 220] },
      ],
    });

  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), contour(ctx.preview ? 40000 : 30000, 0, ctx.preview ? 0.5 : 1)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Slide the band edges up and down: the bands grow and shrink around each cluster.
    stop = animate((t) => deck.setProps({ layers: [landLayer(), contour(40000, (1 + Math.sin(t)) * 30, 0.5)] }));
  } else {
    let [cell, shift] = [30000, 0];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), contour(cell, shift, (cell / 30000) ** 2)] });
    const bar = controlBar(el);
    slider(bar, 'cellSize (m)', 10000, 60000, 2000, cell, (v) => ((cell = v), refresh()));
    slider(bar, 'band shift', -30, 100, 5, shift, (v) => ((shift = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
