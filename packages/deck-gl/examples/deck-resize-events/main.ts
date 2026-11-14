// Deck onResize with getCanvas and getViewports as the box resizes
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.2 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let resizes = 0;

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
    // Fires when the canvas changes size, with the new size in CSS pixels.
    onResize: ({ width, height }) => {
      resizes++;
      const canvas = deck.getCanvas();
      const viewport = deck.getViewports()[0];
      label.textContent = `resize #${resizes}: ${width} x ${height}\ngetCanvas(): ${canvas?.clientWidth} x ${canvas?.clientHeight} css px\nviewport: ${viewport?.width} x ${viewport?.height}`;
    },
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Grow and shrink the box: Deck's canvas fills it, so onResize fires.
    stop = animate((t) => {
      stage.box.style.width = `${Math.round(190 + (Math.sin(t) + 1) * 35)}px`;
    });
  } else {
    slider(controlBar(el), 'box width %', 40, 100, 5, 100, (v) => {
      stage.box.style.width = `${v}%`;
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
