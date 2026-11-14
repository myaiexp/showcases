// highlightedObjectIndex highlights an object from code, with no pointer; -1 clears it
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);

  const layers = (index: number) => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 60_000,
      getFillColor: [90, 170, 255, 210],
      radiusMinPixels: 4,
      pickable: true,
      // Overrides autoHighlight; an index that matches no object highlights nothing.
      highlightedObjectIndex: index,
      highlightColor: [255, 200, 60, 255],
    }),
    new TextLayer<City>({
      id: 'name',
      data: CITIES[index] ? [CITIES[index]] : [],
      getPosition: (d) => d.coordinates,
      getText: (d) => d.name,
      getSize: 14,
      getColor: [255, 240, 200],
      getPixelOffset: [0, -16],
      characterSet: 'auto',
      parameters: { depthCompare: 'always' },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(0) });
  const show = (index: number): void => {
    deck.setProps({ layers: layers(index) });
    label.textContent = `highlightedObjectIndex: ${index}${CITIES[index] ? ` (${CITIES[index]!.name})` : ' (none)'}`;
  };
  show(0);

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    stop = animate((t) => show(Math.floor(t / 0.9) % CITIES.length));
  } else {
    const bar = controlBar(el);
    const input = slider(bar, 'index', -1, CITIES.length - 1, 1, 0, show);
    check(bar, 'auto-step', false, (on) => {
      clearInterval(timer);
      if (on)
        timer = window.setInterval(() => {
          const next = (Number(input.value) + 1) % CITIES.length;
          input.value = String(next);
          input.dispatchEvent(new Event('input'));
        }, 700);
    });
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
