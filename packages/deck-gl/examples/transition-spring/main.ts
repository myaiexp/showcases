// transitions type 'spring': radiusScale overshoots and settles, with no duration
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  if (ctx.preview) overlay(stage.box, 'spring: stiffness 0.03, damping 0.15', 'bottom');
  let big = false;
  let stiffness = 0.03;
  let damping = 0.15;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 40_000,
      getFillColor: [255, 150, 70, 220],
      radiusMinPixels: 2,
      radiusScale: big ? 2.6 : 1,
      // Low damping makes the radius overshoot and ring before it settles.
      transitions: { radiusScale: { type: 'spring', stiffness, damping } },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const toggle = (): void => {
    big = !big;
    deck.setProps({ layers: layers() });
  };

  let timer = 0;
  if (ctx.preview) timer = window.setInterval(toggle, 2000);
  else {
    const bar = controlBar(el);
    slider(bar, 'stiffness', 0.01, 0.2, 0.01, stiffness, (v) => (stiffness = v));
    slider(bar, 'damping', 0.05, 0.9, 0.05, damping, (v) => (damping = v));
    button(bar, 'Pulse', toggle);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
