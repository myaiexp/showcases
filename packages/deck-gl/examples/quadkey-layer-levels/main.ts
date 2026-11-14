// QuadkeyLayer: getQuadkey reads a quadkey string; its length is the tile level
import { Deck } from '@deck.gl/core';
import { QuadkeyLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { countBy, heat, quadkeyOf, toCells, type CellCount } from '../../shared/geo-layers-cells.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const points = spots(ctx.preview ? 1500 : 5000);
  const view = europeView(ctx.preview);

  const cells = (level: number): QuadkeyLayer<CellCount> => {
    const data = toCells(countBy(points, (p) => quadkeyOf(p.position, level)));
    const max = data[0]?.count ?? 1;
    return new QuadkeyLayer<CellCount>({
      id: 'quadkey',
      data,
      getQuadkey: (d) => d.id,
      getFillColor: (d) => [...heat(Math.sqrt(d.count / max)), 220],
      getLineColor: [255, 255, 255, 70],
      lineWidthMinPixels: 1,
      stroked: true,
      extruded: false,
      pickable: !ctx.preview,
    });
  };
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), cells(6)],
    getTooltip: ({ object }: { object?: CellCount }) => (object ? `${object.id}\n${object.count} points` : null),
  });

  let timer = 0;
  if (ctx.preview) {
    let level = 5;
    timer = window.setInterval(() => {
      level = level === 7 ? 4 : level + 1;
      deck.setProps({ layers: [landLayer(), cells(level)] });
    }, 2000);
  } else {
    slider(controlBar(el), 'quadkey length (level)', 3, 9, 1, 6, (v) => deck.setProps({ layers: [landLayer(), cells(v)] }));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
