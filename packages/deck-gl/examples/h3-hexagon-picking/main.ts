// H3HexagonLayer picking: the picked object is the data record, with its H3 index
import { Deck } from '@deck.gl/core';
import type { PickingInfo } from '@deck.gl/core';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { cellToLatLng, cellToParent, getResolution, gridDisk, latLngToCell } from 'h3-js';
import type { Mount } from '@/types.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { readout } from '../../shared/controls.ts';
import { countBy, heat, toCells, type CellCount } from '../../shared/geo-layers-cells.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const res = ctx.preview ? 3 : 4;
  const points = spots(ctx.preview ? 1500 : 5000);
  const data = toCells(countBy(points, (p) => latLngToCell(p.position[1], p.position[0], res)));
  const max = data[0]?.count ?? 1;
  const view = europeView(ctx.preview);
  let selected: string | null = null;

  const hexagons = (): H3HexagonLayer<CellCount> =>
    new H3HexagonLayer<CellCount>({
      id: 'h3',
      data,
      getHexagon: (d) => d.id,
      getFillColor: (d) => [...heat(Math.sqrt(d.count / max)), 220],
      getLineColor: (d) => (d.id === selected ? [255, 255, 255] : [255, 255, 255, 40]),
      getLineWidth: (d) => (d.id === selected ? 3 : 1),
      lineWidthUnits: 'pixels',
      stroked: true,
      extruded: false,
      pickable: !ctx.preview,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 120],
      updateTriggers: { getLineColor: [selected], getLineWidth: [selected] },
    });

  const info = ctx.preview ? null : readout(el, 'Click a cell.');
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), hexagons()],
    getTooltip: ({ object }: PickingInfo<CellCount>) => (object ? `${object.id}\n${object.count} points` : null),
    onClick: ({ object }: PickingInfo<CellCount>) => {
      if (!object || !info) return;
      selected = object.id;
      const [lat, lng] = cellToLatLng(object.id);
      info.textContent = `${object.id}  res ${getResolution(object.id)}  ${object.count} points\n` +
        `centre ${lng.toFixed(2)}, ${lat.toFixed(2)}  parent ${cellToParent(object.id, res - 1)}  ${gridDisk(object.id, 1).length - 1} neighbours`;
      deck.setProps({ layers: [landLayer(), hexagons()] });
    },
  });

  // Card: pick the busiest cells in turn, as a click would.
  let k = 0;
  const timer = ctx.preview
    ? setInterval(() => {
        selected = data[k++ % 6]!.id;
        deck.setProps({ layers: [landLayer(), hexagons()] });
      }, 1200)
    : 0;
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, longitude: view.longitude + Math.sin(t * 0.4) * 2 } })) : () => {};
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
