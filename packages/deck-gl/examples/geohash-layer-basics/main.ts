// GeohashLayer: getGeohash reads a geohash string; the layer draws its rectangle
import { Deck } from '@deck.gl/core';
import { GeohashLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { countBy, geohashOf, heat, toCells, type CellCount } from '../../shared/geo-layers-cells.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const points = spots(ctx.preview ? 1500 : 5000);
  const view = europeView(ctx.preview);

  const cells = (precision: number): GeohashLayer<CellCount> => {
    const data = toCells(countBy(points, (p) => geohashOf(p.position, precision)));
    const max = data[0]?.count ?? 1;
    return new GeohashLayer<CellCount>({
      id: 'geohash',
      data,
      getGeohash: (d) => d.id,
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
    layers: [landLayer(), cells(ctx.preview ? 3 : 4)],
    getTooltip: ({ object }: { object?: CellCount }) => (object ? `${object.id}\n${object.count} points` : null),
  });

  let timer = 0;
  if (ctx.preview) {
    let precision = 3;
    timer = window.setInterval(() => {
      precision = precision === 4 ? 2 : precision + 1;
      deck.setProps({ layers: [landLayer(), cells(precision)] });
    }, 2200);
  } else {
    slider(controlBar(el), 'geohash precision', 2, 5, 1, 4, (p) => deck.setProps({ layers: [landLayer(), cells(p)] }));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
