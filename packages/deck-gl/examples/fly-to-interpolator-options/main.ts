// FlyToInterpolator options: speed, curve, screenSpeed and maxDuration, with the measured duration
import { Deck, FlyToInterpolator } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, check, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const STOPS: MapViewState[] = [
  { longitude: 2.35, latitude: 48.86, zoom: 4 },
  { longitude: -74, latitude: 40.7, zoom: 4 },
  { longitude: 139.7, latitude: 35.7, zoom: 4 },
  { longitude: 151.2, latitude: -33.9, zoom: 4 },
  { longitude: 18.4, latitude: -33.9, zoom: 4 },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const opts = { speed: ctx.preview ? 3 : 1.2, curve: 1.414, screenSpeed: 0.5, useScreenSpeed: false, maxDuration: 0 };
  let stop = 0;
  let started = 0;
  const label = ctx.preview ? null : readout(el, 'Press Fly to the next city.');

  const deck = new Deck({
    device: stage.device,
    initialViewState: STOPS[0]!,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: 5,
        radiusUnits: 'pixels',
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const fly = (): void => {
    stop = (stop + 1) % STOPS.length;
    const interpolator = new FlyToInterpolator({
      curve: opts.curve,
      // When screenSpeed is given, speed is ignored.
      ...(opts.useScreenSpeed ? { screenSpeed: opts.screenSpeed } : { speed: opts.speed }),
      // A computed duration above maxDuration comes back as 0: the camera jumps.
      ...(opts.maxDuration > 0 ? { maxDuration: opts.maxDuration } : {}),
    });
    started = performance.now();
    if (label) label.textContent = 'flying...';
    deck.setProps({
      initialViewState: {
        ...STOPS[stop]!,
        transitionInterpolator: interpolator,
        transitionDuration: 'auto',
        onTransitionStart: () => (started = performance.now()),
        onTransitionEnd: () => {
          if (label) label.textContent = `arrived after ${Math.round(performance.now() - started)} ms`;
        },
      },
    });
    // A duration of 0 means no transition at all, so no end callback fires.
    if (label) {
      window.setTimeout(() => {
        if (label.textContent === 'flying...') label.textContent = 'duration 0: the camera jumped (maxDuration was too small)';
      }, 150);
    }
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(fly, 3000);
  } else {
    const bar = controlBar(el);
    button(bar, 'Fly to the next city', fly);
    slider(bar, 'speed', 0.4, 6, 0.2, opts.speed, (v) => (opts.speed = v));
    slider(bar, 'curve', 0.5, 3, 0.1, opts.curve, (v) => (opts.curve = v));
    check(bar, 'use screenSpeed', false, (v) => (opts.useScreenSpeed = v));
    slider(bar, 'screenSpeed', 0.1, 2, 0.1, opts.screenSpeed, (v) => (opts.screenSpeed = v));
    slider(bar, 'maxDuration ms (0 = none)', 0, 8000, 500, 0, (v) => (opts.maxDuration = v));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
