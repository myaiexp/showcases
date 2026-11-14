// drawPickingColors: see the picking buffer, one flat colour per pickable object
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 30, zoom: ctx.preview ? 0.6 : 1.5 };
  const makeLayers = () => [
    landLayer(),
    // Pickable: appears in the picking buffer.
    new ScatterplotLayer<City>({ id: 'pickable-dots', data: CITIES, pickable: true, getPosition: (d) => d.coordinates, getRadius: (d) => Math.sqrt(d.population) * 90_000, radiusMinPixels: 4, getFillColor: [255, 170, 70, 200] }),
    // Not pickable: absent from the picking buffer.
    new ScatterplotLayer<City>({ id: 'unpickable-rings', data: CITIES.filter((c) => c.population > 18), stroked: true, filled: false, getPosition: (d) => d.coordinates, getRadius: 700_000, getLineColor: [90, 200, 255], lineWidthMinPixels: 2 }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: makeLayers(), drawPickingColors: ctx.preview });

  let timer = 0;
  if (ctx.preview) {
    let on = true;
    timer = window.setInterval(() => {
      on = !on;
      deck.setProps({ drawPickingColors: on });
    }, 2000);
  } else {
    check(controlBar(el), 'drawPickingColors', false, (v) => deck.setProps({ drawPickingColors: v }));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
