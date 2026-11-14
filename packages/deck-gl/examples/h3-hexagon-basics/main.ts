// H3HexagonLayer: getHexagon reads an H3 cell id; the layer draws the hexagon
import { Deck } from '@deck.gl/core';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { latLngToCell } from 'h3-js';
import type { Mount } from '@/types.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { countBy, heat, toCells, type CellCount } from '../../shared/geo-layers-cells.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const points = spots(ctx.preview ? 1500 : 5000);
  const view = europeView(ctx.preview);

  const cellsAt = (res: number): CellCount[] => toCells(countBy(points, (p) => latLngToCell(p.position[1], p.position[0], res)));
  const hexagons = (res: number): H3HexagonLayer<CellCount> => {
    const data = cellsAt(res);
    const max = data[0]?.count ?? 1;
    return new H3HexagonLayer<CellCount>({
      id: 'h3',
      data,
      // The only thing the layer needs from each object: its H3 index.
      getHexagon: (d) => d.id,
      getFillColor: (d) => [...heat(Math.sqrt(d.count / max)), 220],
      extruded: false,
      stroked: true,
      getLineColor: [255, 255, 255, 60],
      lineWidthMinPixels: 1,
      pickable: !ctx.preview,
    });
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), hexagons(ctx.preview ? 3 : 4)],
    getTooltip: ({ object }: { object?: CellCount }) => (object ? `${object.id}\n${object.count} points` : null),
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Card: cycle the resolution 2 to 4.
    let res = 3;
    const timer = setInterval(() => {
      res = res === 4 ? 2 : res + 1;
      deck.setProps({ layers: [landLayer(), hexagons(res)] });
    }, 2000);
    stop = () => clearInterval(timer);
  } else {
    slider(controlBar(el), 'H3 resolution', 2, 5, 1, 4, (res) => deck.setProps({ layers: [landLayer(), hexagons(res)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
