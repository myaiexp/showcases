// Deck onBeforeRender/onAfterRender and redraw: counting drawn frames
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.2 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let before = 0;
  let after = 0;
  let lastFrameMs = 0;
  let started = 0;
  const show = (): void => {
    label.textContent = `onBeforeRender ${before}   onAfterRender ${after}   last frame ${lastFrameMs.toFixed(1)} ms`;
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (c) => c.coordinates,
        getRadius: (c) => Math.sqrt(c.population) * 60_000,
        getFillColor: [255, 140, 60, 220],
        radiusMinPixels: 2,
      }),
    ],
    // Deck redraws only when something changed: these bracket every frame it draws.
    onBeforeRender: () => {
      before++;
      started = performance.now();
    },
    onAfterRender: () => {
      after++;
      lastFrameMs = performance.now() - started;
      show();
    },
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(10 + t * 8) } }));
  } else {
    const bar = controlBar(el);
    button(bar, 'redraw()', () => deck.redraw());
    button(bar, "redraw('reason')", () => deck.redraw('forced from the button'));
    button(bar, 'setProps({})', () => deck.setProps({}));
    show();
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
