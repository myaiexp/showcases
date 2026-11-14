// TripsLayer inherits PathLayer: capRounded, jointRounded, widthMinPixels
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TripsLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { streetTrips, TRIP_LOOP, type Trip } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0e1520' });
  const view: MapViewState = { longitude: -122.42, latitude: 37.77, zoom: ctx.preview ? 13.4 : 14.2 };
  const trips = streetTrips(ctx.preview ? 40 : 60, [-122.42, 37.77], 11);

  let currentTime = 0;
  let capRounded = true;
  let jointRounded = true;
  let widthMinPixels = ctx.preview ? 8 : 10;
  const layer = (): TripsLayer<Trip> =>
    new TripsLayer<Trip>({
      id: 'trips',
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => d.color,
      currentTime,
      trailLength: 160,
      capRounded,
      jointRounded,
      widthMinPixels,
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [layer()] });

  const flip = ctx.preview
    ? setInterval(() => {
        capRounded = !capRounded;
        jointRounded = !jointRounded;
      }, 2500)
    : 0;
  const stop = animate((t) => {
    currentTime = (t * 50) % TRIP_LOOP;
    deck.setProps({ layers: [layer()] });
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    check(bar, 'capRounded', capRounded, (v) => (capRounded = v));
    check(bar, 'jointRounded', jointRounded, (v) => (jointRounded = v));
    slider(bar, 'widthMinPixels', 2, 24, 1, widthMinPixels, (v) => (widthMinPixels = v));
  }
  return () => {
    clearInterval(flip);
    stop();
    stage.release(deck);
  };
};

export default mount;
