// ScreenGridLayer aggregation, gpuAggregation and picking a cell
import { Deck } from '@deck.gl/core';
import type { PickingInfo } from '@deck.gl/core';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers';
import type { ScreenGridLayerPickingInfo } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Op = 'SUM' | 'MEAN' | 'MIN' | 'MAX' | 'COUNT';
const OPS: readonly Op[] = ['SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview);
  const info = ctx.preview ? null : readout(el, 'Hover a cell.');

  const describe = (picked: PickingInfo): string => {
    // The layer's getPickingInfo returns ScreenGridLayerPickingInfo; Deck types the callback arg wider.
    const { object } = picked as ScreenGridLayerPickingInfo<Spot>;
    if (!object) return 'Hover a cell.';
    return `col ${object.col}, row ${object.row}: value ${object.value}, ${object.count} points\npointIndices: ${object.pointIndices ? object.pointIndices.length : 'not available'}, points: ${object.points ? object.points.length : 'not available'}`;
  };

  const screenGrid = (aggregation: Op, gpuAggregation: boolean): ScreenGridLayer<Spot> =>
    new ScreenGridLayer<Spot>({
      id: 'screen-grid',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSizePixels: ctx.preview ? 18 : 30,
      aggregation,
      gpuAggregation,
      pickable: !ctx.preview,
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), screenGrid('SUM', true)],
    onHover: (picked) => {
      if (info) info.textContent = describe(picked);
    },
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), screenGrid(OPS[++i % OPS.length]!, true)] }), 1600);
    const drift = animate((t) => deck.setProps({ viewState: { ...view, longitude: view.longitude + Math.sin(t * 0.5) * 2 } }));
    stop = () => {
      clearInterval(timer);
      drift();
    };
  } else {
    let [op, gpu] = ['SUM', true] as [Op, boolean];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), screenGrid(op, gpu)] });
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
