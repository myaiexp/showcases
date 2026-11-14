// GridLayer picking: the aggregated cell, and what only CPU aggregation keeps
import { Deck } from '@deck.gl/core';
import type { PickingInfo } from '@deck.gl/core';
import { GridLayer } from '@deck.gl/aggregation-layers';
import type { GridLayerPickingInfo } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 45 });
  const info = ctx.preview ? null : readout(el, 'Hover a cell.');

  const describe = (picked: PickingInfo): string => {
    // The layer's getPickingInfo returns GridLayerPickingInfo; Deck types the callback arg wider.
    const { object } = picked as GridLayerPickingInfo<Spot>;
    if (!object) return 'Hover a cell.';
    return [
      `col ${object.col}, row ${object.row}: ${object.count} points`,
      `colorValue ${object.colorValue}, elevationValue ${object.elevationValue}`,
      `pointIndices: ${object.pointIndices ? object.pointIndices.length : 'not available'}, points: ${object.points ? object.points.length : 'not available'}`,
    ].join('\n');
  };

  const grid = (gpuAggregation: boolean): GridLayer<Spot> =>
    new GridLayer<Spot>({
      id: 'grid',
      data,
      getPosition: (d) => d.position,
      getColorWeight: (d) => d.weight,
      getElevationWeight: (d) => d.weight,
      gpuAggregation,
      cellSize: ctx.preview ? 50000 : 20000,
      extruded: true,
      elevationScale: 5,
      pickable: !ctx.preview,
      autoHighlight: true,
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), grid(true)],
    onHover: (picked) => {
      if (info) info.textContent = describe(picked);
    },
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 6 } }));
  } else {
    check(controlBar(el), 'gpuAggregation', true, (v) => deck.setProps({ layers: [landLayer(), grid(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
