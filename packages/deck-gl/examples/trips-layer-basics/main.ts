// TripsLayer: currentTime is the playhead, trailLength how long a path takes to fade
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TripsLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { streetTrips, TRIP_LOOP, type Trip } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1520' });
  const view: MapViewState = { longitude: -122.42, latitude: 37.77, zoom: ctx.preview ? 12.9 : 13.7, pitch: 0 };
  const trips = streetTrips(ctx.preview ? 70 : 120);

  let currentTime = 0;
  let trailLength = 120;
  const layer = (): TripsLayer<Trip> =>
    new TripsLayer<Trip>({
      id: 'trips',
      data: trips,
      getPath: (d) => d.path,
      // One timestamp per path vertex, small numbers: they are stored as float32.
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => d.color,
      widthMinPixels: 4,
      currentTime,
      trailLength,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [layer()] });

  let playing = true;
  let last = 0;
  const stop = animate((t) => {
    if (playing) currentTime = (currentTime + (t - last) * 60) % TRIP_LOOP;
    last = t;
    deck.setProps({ layers: [layer()] });
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    button(bar, 'Play / pause', () => (playing = !playing));
    slider(bar, 'trailLength', 10, 400, 10, trailLength, (v) => (trailLength = v));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
