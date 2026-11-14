// TripsLayer getTimestamps: epoch milliseconds lose precision as float32 unless offset
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TripsLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { streetTrips, TRIP_LOOP, type Trip } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

// The start of the data set, as unix milliseconds (a "long int" in the docs' words).
const START = 1554772579000;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1520' });
  const view: MapViewState = { longitude: -122.42, latitude: 37.77, zoom: ctx.preview ? 12.9 : 13.7 };
  const trips = streetTrips(ctx.preview ? 50 : 100, [-122.42, 37.77], 21);

  let subtract = true;
  let currentTime = 0;
  const layer = (): TripsLayer<Trip> =>
    new TripsLayer<Trip>({
      id: 'trips',
      data: trips,
      getPath: (d) => d.path,
      // Seconds since START, times 1000: either small numbers or raw epoch milliseconds.
      getTimestamps: (d) => d.timestamps.map((t) => (subtract ? 0 : START) + t * 1000),
      getColor: (d) => d.color,
      widthMinPixels: 4,
      currentTime: (subtract ? 0 : START) + currentTime * 1000,
      trailLength: 120_000,
      updateTriggers: { getTimestamps: [subtract] },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [layer()] });

  let info: HTMLElement | null = null;
  const describe = (): void => {
    if (!info) return;
    const sample = START + 12_345;
    info.textContent = `raw epoch: Math.fround(${sample}) = ${Math.fround(sample)}  (${Math.fround(sample) === sample ? 'exact' : 'precision lost'})\n` +
      `offset:    Math.fround(12345) = ${Math.fround(12_345)}  (exact)`;
  };

  const stop = animate((t) => {
    currentTime = (t * 60) % TRIP_LOOP;
    deck.setProps({ layers: [layer()] });
  });
  // Card: toggle so the stuttering of raw epoch values shows next to the smooth one.
  const flip = ctx.preview ? setInterval(() => (subtract = !subtract), 3500) : 0;

  if (!ctx.preview) {
    const bar = controlBar(el);
    check(bar, 'subtract the start time', subtract, (v) => (subtract = v));
    info = readout(el);
    describe();
  }
  return () => {
    clearInterval(flip);
    stop();
    stage.release(deck);
  };
};

export default mount;
