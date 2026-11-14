// LinearInterpolator({around, makeViewport}): zoom and rotate while one screen point stays fixed
import { Deck, LinearInterpolator, WebMercatorViewport } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const HOME: MapViewState = { longitude: 15, latitude: 40, zoom: 3, bearing: 0 };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let around: [number, number] = ctx.preview ? [70, 70] : [150, 120];
  let zoomedIn = false;
  const label = ctx.preview ? null : readout(el, 'Click the map to move the anchor (the ring), then zoom.');

  // The anchor: a ring in the stage that marks the screen pixel that must not move.
  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position: 'absolute', width: '16px', height: '16px', marginLeft: '-8px', marginTop: '-8px',
    border: '2px solid #fff', borderRadius: '50%', pointerEvents: 'none',
  });
  stage.box.append(ring);
  const placeRing = (): void => {
    ring.style.left = `${around[0]}px`;
    ring.style.top = `${around[1]}px`;
  };
  placeRing();

  const deck = new Deck({
    device: stage.device,
    initialViewState: HOME,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: 4,
        radiusUnits: 'pixels',
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const toggle = (): void => {
    zoomedIn = !zoomedIn;
    deck.setProps({
      initialViewState: {
        ...HOME,
        zoom: zoomedIn ? 5.5 : 3,
        bearing: zoomedIn ? 45 : 0,
        transitionDuration: 2000,
        // makeViewport lets the interpolator unproject the anchor pixel at the start and end states.
        transitionInterpolator: new LinearInterpolator({
          transitionProps: ['zoom', 'bearing', 'longitude', 'latitude'],
          around,
          makeViewport: (props) => new WebMercatorViewport(props),
        }),
      },
    });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(toggle, 2800);
  } else {
    stage.canvas.addEventListener('pointerup', (e) => {
      const r = stage.canvas.getBoundingClientRect();
      around = [e.clientX - r.left, e.clientY - r.top];
      placeRing();
      if (label) label.textContent = `anchor at ${Math.round(around[0])}, ${Math.round(around[1])} px`;
    });
    const bar = controlBar(el);
    button(bar, 'Zoom in and rotate / back out', toggle);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
