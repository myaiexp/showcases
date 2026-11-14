// TripsLayer: fadeTrail on or off, trailLength sets how long the visible tail is
import { Deck } from '@deck.gl/core';
import type { Layer, MapViewState } from '@deck.gl/core';
import { TripsLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { city, type City } from '../../shared/data.ts';
import { TRIP_LOOP, voyages, type Trip } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const pairs = [
  ['London', 'New York'],
  ['Tokyo', 'Los Angeles'],
  ['Dubai', 'Singapore'],
  ['Sydney', 'Santiago'],
  ['Cairo', 'Mumbai'],
  ['Moscow', 'Beijing'],
  ['Lagos', 'Rio de Janeiro'],
  ['Paris', 'Honolulu'],
].map(([a, b]) => [city(a!), city(b!)] as [City, City]);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 20, zoom: ctx.preview ? 0 : 0.9 };
  const trips = voyages(pairs);

  let currentTime = 0;
  let fadeTrail = true;
  let trailLength = 80;
  const layers = (): Layer[] => [
    landLayer(),
    new TripsLayer<Trip>({
      id: 'voyages',
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => d.color,
      widthMinPixels: 4,
      capRounded: true,
      jointRounded: true,
      currentTime,
      // With fadeTrail off, trailLength has no effect: the whole path behind the head stays.
      fadeTrail,
      trailLength,
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  // Card: flip fadeTrail so the difference shows itself.
  const flip = ctx.preview
    ? setInterval(() => {
        fadeTrail = !fadeTrail;
      }, 3000)
    : 0;
  const stop = animate((t) => {
    currentTime = (t * 30) % (TRIP_LOOP * 0.8);
    deck.setProps({ layers: layers() });
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    check(bar, 'fadeTrail', fadeTrail, (v) => (fadeTrail = v));
    slider(bar, 'trailLength', 10, 300, 10, trailLength, (v) => (trailLength = v));
  }
  return () => {
    clearInterval(flip);
    stop();
    stage.release(deck);
  };
};

export default mount;
