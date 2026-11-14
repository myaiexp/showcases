// ContourLayer zIndex and zOffset: an isoline drawn above or below an isoband
import { Deck } from '@deck.gl/core';
import { ContourLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 1200 : 4000);
  const view = europeView(ctx.preview, { pitch: 40 });

  const contour = (lineOnTop: boolean, zOffset: number, k = ctx.preview ? 0.5 : 1): ContourLayer<Spot> =>
    new ContourLayer<Spot>({
      id: 'contours',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSize: ctx.preview ? 40000 : 30000,
      zOffset, // added to every vertex's z, so layered contours do not z-fight
      contours: [
        { threshold: [60 * k, 180 * k], color: [60, 150, 255, 200], zIndex: lineOnTop ? 0 : 1 },
        { threshold: 120 * k, color: [255, 240, 120], strokeWidth: 4, zIndex: lineOnTop ? 1 : 0 },
      ],
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), contour(true, 0.005)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: Math.sin(t * 0.5) * 25 } }));
  } else {
    let [top, offset] = [true, 0.005];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), contour(top, offset)] });
    const bar = controlBar(el);
    check(bar, 'isoline above isoband (zIndex)', top, (v) => ((top = v), refresh()));
    slider(bar, 'zOffset', 0, 0.05, 0.001, offset, (v) => ((offset = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
