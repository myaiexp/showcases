// H3ClusterLayer: getHexagons returns a set of cells, drawn as one merged outline
import { Deck } from '@deck.gl/core';
import { H3ClusterLayer } from '@deck.gl/geo-layers';
import { gridDisk, latLngToCell } from 'h3-js';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { city } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Zone {
  name: string;
  hexagons: string[];
  color: [number, number, number];
}

const places: [string, [number, number, number]][] = [
  ['Paris', [255, 150, 60]],
  ['Berlin', [90, 210, 255]],
  ['Madrid', [255, 110, 150]],
  ['London', [150, 240, 140]],
];

const zones = (res: number, k: number): Zone[] =>
  places.map(([name, color]) => {
    const [lng, lat] = city(name).coordinates;
    return { name, color, hexagons: gridDisk(latLngToCell(lat, lng, res), k) };
  });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view = { longitude: 5, latitude: 48, zoom: ctx.preview ? 3 : 4.1 };

  const clusters = (k: number): H3ClusterLayer<Zone> =>
    new H3ClusterLayer<Zone>({
      id: 'zones',
      data: zones(4, k),
      // One array of H3 indices per object, joined into outline polygons.
      getHexagons: (d) => d.hexagons,
      getFillColor: (d) => [...d.color, 90],
      getLineColor: (d) => d.color,
      lineWidthMinPixels: 2,
      stroked: true,
      filled: true,
      pickable: !ctx.preview,
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), clusters(3)],
    getTooltip: ({ object }: { object?: Zone }) => (object ? `${object.name}: ${object.hexagons.length} cells` : null),
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), clusters(1 + Math.floor((t * 0.8) % 5))] }));
  } else {
    slider(controlBar(el), 'k (rings around the centre cell)', 0, 8, 1, 3, (k) => deck.setProps({ layers: [landLayer(), clusters(k)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
