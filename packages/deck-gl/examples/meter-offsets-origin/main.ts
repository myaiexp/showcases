// coordinateSystem METER_OFFSETS: positions are metres east and north of origin
import { COORDINATE_SYSTEM, Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { city } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';

interface Offset {
  /** [east, north, up] in metres from the layer's coordinateOrigin. */
  position: [number, number, number];
}

/** A 13 x 13 grid of points every 150 m, centred on the origin. */
const GRID: Offset[] = Array.from({ length: 169 }, (_, i) => ({
  position: [((i % 13) - 6) * 150, (Math.floor(i / 13) - 6) * 150, 0],
}));
const AXES = [
  { to: [1200, 0, 0] as [number, number, number], color: [255, 90, 90] as [number, number, number] },
  { to: [0, 1200, 0] as [number, number, number], color: [90, 230, 120] as [number, number, number] },
];

const PLACES = ['Helsinki', 'Paris', 'Sydney', 'Lima'] as const;

const mount: Mount = async (el, ctx) => {
// City scale: the world basemap would be one flat fill that z-fights with flat layers,
  // so the stage colour stands in for land (see the trap list in shared/stage.ts).
  const stage = await createStage(el, ctx, { background: '#1e2938' });
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let place: (typeof PLACES)[number] = 'Helsinki';

  const viewAt = (name: string): MapViewState => {
    const [longitude, latitude] = city(name).coordinates;
    return { longitude, latitude, zoom: ctx.preview ? 12.2 : 12.8 };
  };
  const layers = () => {
    const [lng, lat] = city(place).coordinates;
    const origin: [number, number, number] = [lng, lat, 0];
    return [
      new ScatterplotLayer<Offset>({
        id: 'grid',
        data: GRID,
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: origin, // where [0, 0, 0] sits on the map
        getPosition: (d) => d.position,
        getRadius: 40, // metres
        getFillColor: [255, 190, 90, 220],
      }),
      // The x axis points map east, y points north.
      new LineLayer<(typeof AXES)[number]>({
        id: 'axes',
        data: AXES,
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: origin,
        getSourcePosition: () => [0, 0, 0],
        getTargetPosition: (d) => d.to,
        getColor: (d) => d.color,
        getWidth: 3,
      }),
    ];
  };

  const deck = new Deck({ device: stage.device, initialViewState: viewAt(place), controller: !ctx.preview, layers: layers() });
  const go = (name: (typeof PLACES)[number]): void => {
    place = name;
    deck.setProps({ initialViewState: viewAt(name), layers: layers() });
    label.textContent = `coordinateOrigin: ${name} [${city(name).coordinates.join(', ')}]; red x east, green y north`;
  };
  label.textContent = `coordinateOrigin: ${place}; red x east, green y north`;

  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => go(PLACES[++i % PLACES.length]!), 2400);
  } else {
    select(controlBar(el), 'coordinateOrigin', PLACES, go, place);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
