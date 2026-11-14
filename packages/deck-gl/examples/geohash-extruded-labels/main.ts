// GeohashLayer extruded by count, a TextLayer showing each cell's geohash
import { Deck } from '@deck.gl/core';
import { GeohashLayer } from '@deck.gl/geo-layers';
import { TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { countBy, geohashOf, heat, toCells, type CellCount } from '../../shared/geo-layers-cells.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Labelled extends CellCount {
  position: [number, number, number];
}

// Centre of a geohash cell, by decoding its bisections.
const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';
function centre(hash: string): [number, number] {
  const lng: [number, number] = [-180, 180];
  const lat: [number, number] = [-90, 90];
  let even = true;
  for (const ch of hash) {
    const v = BASE32.indexOf(ch);
    for (let bit = 4; bit >= 0; bit--) {
      const r = even ? lng : lat;
      const mid = (r[0] + r[1]) / 2;
      if ((v >> bit) & 1) r[0] = mid;
      else r[1] = mid;
      even = !even;
    }
  }
  return [(lng[0] + lng[1]) / 2, (lat[0] + lat[1]) / 2];
}

// Column height in metres per point: getElevation times elevationScale.
const SCALE = 5;
const ELEVATION = 100 * SCALE;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const precision = 3;
  const points = spots(ctx.preview ? 2000 : 6000);
  const data = toCells(countBy(points, (p) => geohashOf(p.position, precision)));
  const max = data[0]?.count ?? 1;
  const labels: Labelled[] = data.slice(0, ctx.preview ? 14 : 40).map((d) => ({ ...d, position: [...centre(d.id), d.count * ELEVATION] }));
  const view = europeView(ctx.preview, { pitch: 50, bearing: 10, zoom: ctx.preview ? 3.2 : 4.3 });

  const layers = (wireframe: boolean): [ReturnType<typeof landLayer>, GeohashLayer<CellCount>, TextLayer<Labelled>] => [
    landLayer(),
    new GeohashLayer<CellCount>({
      id: 'geohash',
      data,
      getGeohash: (d) => d.id,
      getFillColor: (d) => heat(Math.sqrt(d.count / max)),
      getElevation: (d) => d.count * 100,
      elevationScale: SCALE,
      extruded: true,
      wireframe,
      getLineColor: [255, 255, 255],
    }),
    new TextLayer<Labelled>({
      id: 'labels',
      data: labels,
      getPosition: (d) => d.position,
      getText: (d) => d.id,
      getSize: 13,
      getColor: [255, 255, 255],
      background: true,
      getBackgroundColor: [10, 20, 30, 200],
      // Labels sit on the column tops; keep them drawn over the extrusions.
      parameters: { depthCompare: 'always' },
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(false) });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, bearing: 10 + t * 6 } })) : () => {};
  if (!ctx.preview) check(controlBar(el), 'wireframe', false, (v) => deck.setProps({ layers: layers(v) }));
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
