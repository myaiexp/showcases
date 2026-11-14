// ContourLayer aggregation, gpuAggregation and picking a contour
import { Deck } from '@deck.gl/core';
import type { Color, PickingInfo } from '@deck.gl/core';
import { ContourLayer } from '@deck.gl/aggregation-layers';
import type { ContourLayerPickingInfo } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Op = 'SUM' | 'MEAN' | 'MIN' | 'MAX' | 'COUNT';
const OPS: readonly Op[] = ['SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'];
// One set of thresholds per operation, since each yields values on a different scale.
const COLORS: Color[] = [[90, 200, 255], [255, 220, 90], [255, 90, 90]];
const THRESHOLDS: Record<Op, number[]> = { SUM: [30, 100, 200], MEAN: [5, 8, 11], MIN: [2, 4, 6], MAX: [8, 11, 14], COUNT: [8, 20, 35] };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 1200 : 4000);
  const info = ctx.preview ? null : readout(el, 'Hover a contour.');

  const describe = (picked: PickingInfo): string => {
    // The layer's getPickingInfo returns ContourLayerPickingInfo; Deck types the callback arg wider.
    const { object } = picked as ContourLayerPickingInfo;
    return object ? `contour threshold: ${JSON.stringify(object.contour.threshold)}` : 'Hover a contour.';
  };

  const contour = (aggregation: Op, gpuAggregation: boolean): ContourLayer<Spot> =>
    new ContourLayer<Spot>({
      id: 'contours',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSize: ctx.preview ? 40000 : 30000,
      aggregation,
      gpuAggregation,
      pickable: !ctx.preview,
      contours: THRESHOLDS[aggregation].map((threshold, i) => ({
        threshold: ctx.preview && (aggregation === 'SUM' || aggregation === 'COUNT') ? threshold * 0.5 : threshold,
        color: COLORS[i]!,
        strokeWidth: 3,
      })),
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: europeView(ctx.preview),
    controller: !ctx.preview,
    layers: [landLayer(), contour('SUM', false)],
    onHover: (picked) => {
      if (info) info.textContent = describe(picked);
    },
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), contour(OPS[++i % OPS.length]!, false)] }), 1800);
    stop = () => clearInterval(timer);
  } else {
    let [op, gpu] = ['SUM', false] as [Op, boolean];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), contour(op, gpu)] });
    const bar = controlBar(el);
    select(bar, 'aggregation', OPS, (v) => ((op = v), refresh()), op);
    check(bar, 'gpuAggregation', gpu, (v) => ((gpu = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
