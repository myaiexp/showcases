// HexagonLayer picking: the aggregated bin, and what only CPU aggregation keeps
import { Deck } from '@deck.gl/core';
import type { PickingInfo } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { HexagonLayerPickingInfo } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 45 });
  const info = ctx.preview ? null : readout(el, 'Hover a hexagon.');

  const describe = (picked: PickingInfo): string => {
    // The layer's getPickingInfo returns HexagonLayerPickingInfo; Deck types the callback arg wider.
    const { object } = picked as HexagonLayerPickingInfo<Spot>;
    if (!object) return 'Hover a hexagon.';
    return [
      `col ${object.col}, row ${object.row}: ${object.count} points`,
      `colorValue ${object.colorValue}, elevationValue ${object.elevationValue}`,
      `pointIndices: ${object.pointIndices ? object.pointIndices.length : 'not available'}, points: ${object.points ? object.points.length : 'not available'}`,
    ].join('\n');
  };

  const hexagons = (gpuAggregation: boolean): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      getColorWeight: (d) => d.weight,
      getElevationWeight: (d) => d.weight,
      gpuAggregation,
      radius: ctx.preview ? 55000 : 25000,
      extruded: true,
      elevationScale: 5,
      pickable: !ctx.preview,
      autoHighlight: true,
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), hexagons(true)],
    onHover: (picked) => {
      if (info) info.textContent = describe(picked);
    },
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 6 } }));
  } else {
    check(controlBar(el), 'gpuAggregation', true, (v) => deck.setProps({ layers: [landLayer(), hexagons(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
