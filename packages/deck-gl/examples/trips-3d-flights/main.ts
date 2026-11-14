// TripsLayer: path vertices with altitude, animated with a pitched camera
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TripsLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { city, type City } from '../../shared/data.ts';
import { greatCirclePath } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Flight {
  path: [number, number, number][];
  timestamps: number[];
  color: [number, number, number];
}

const pairs = [
  ['London', 'Paris'],
  ['Paris', 'Berlin'],
  ['Madrid', 'London'],
  ['Berlin', 'Istanbul'],
  ['Paris', 'Cairo'],
  ['Madrid', 'Berlin'],
  ['Moscow', 'London'],
  ['Istanbul', 'Madrid'],
].map(([a, b]) => [city(a!), city(b!)] as [City, City]);
const palette: [number, number, number][] = [[255, 190, 70], [90, 210, 255], [255, 110, 150], [150, 240, 140]];

// Altitude in metres: a parabola that peaks at 90% of a degree-scaled cruise height.
const flights: Flight[] = pairs.map(([a, b], i) => {
  const ll = greatCirclePath(a, b, 40);
  return {
    path: ll.map(([lng, lat], k) => [lng, lat, 4 * (k / 40) * (1 - k / 40) * 600_000]),
    timestamps: ll.map((_, k) => i * 12 + k * 4),
    color: palette[i % palette.length]!,
  };
});

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 12, latitude: 44, zoom: ctx.preview ? 2.7 : 3.4, pitch: 55, bearing: 0 };

  let currentTime = 0;
  let trailLength = 90;
  const layers = (): [ReturnType<typeof landLayer>, TripsLayer<Flight>] => [
    landLayer(),
    new TripsLayer<Flight>({
      id: 'flights',
      data: flights,
      // Positions are [longitude, latitude, altitude in metres].
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => d.color,
      widthMinPixels: 4,
      capRounded: true,
      jointRounded: true,
      currentTime,
      trailLength,
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const stop = animate((t) => {
    currentTime = (t * 25) % 280;
    deck.setProps({
      layers: layers(),
      ...(ctx.preview ? { viewState: { ...view, bearing: t * 6 } } : {}),
    });
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'trailLength', 10, 250, 10, trailLength, (v) => (trailLength = v));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
