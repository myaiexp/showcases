// HeatmapLayer colorDomain: a fixed range keeps colours stable
import { Deck } from '@deck.gl/core';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview);

  const heat = (domain: [number, number] | null): HeatmapLayer<Spot> =>
    new HeatmapLayer<Spot>({
      id: 'heatmap',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      radiusPixels: ctx.preview ? 14 : 35,
      // With MEAN, colorDomain is in plain weight units (SUM would be weight per square metre).
      aggregation: 'MEAN',
      // null: the domain is [max * threshold, max] of what is currently in view.
      colorDomain: domain,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), heat([2, 14])] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Zoom in and out: the fixed domain keeps each cluster's colour where the auto domain would shift.
    stop = animate((t) => deck.setProps({ viewState: { ...view, zoom: view.zoom + Math.sin(t * 0.6) * 0.6 } }));
  } else {
    let [fixed, lo, hi] = [true, 2, 14];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), heat(fixed ? [lo, Math.max(hi, lo + 1)] : null)] });
    const bar = controlBar(el);
    check(bar, 'fixed colorDomain', fixed, (v) => ((fixed = v), refresh()));
    slider(bar, 'domain min', 0, 12, 1, lo, (v) => ((lo = v), refresh()));
    slider(bar, 'domain max', 2, 16, 1, hi, (v) => ((hi = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
