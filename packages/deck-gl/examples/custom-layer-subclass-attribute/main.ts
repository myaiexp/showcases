// Subclassing: add an instanced attribute and use it from an injected size hook
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { PulsingScatterplotLayer } from './pulsing-scatterplot-layer.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  let amount = 0.4;
  let time = 0;

  const layers = (): [ReturnType<typeof landLayer>, PulsingScatterplotLayer<City>] => [
    landLayer(),
    new PulsingScatterplotLayer<City>({
      id: 'pulsing',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 50_000,
      getFillColor: [255, 140, 60, 210],
      radiusMinPixels: 4,
      // The new accessor: each city pulses out of step with the others, by its longitude.
      getPhase: (d) => (d.coordinates[0] / 180) * Math.PI,
      pulseTime: time,
      pulseAmount: amount,
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const stop = animate((t) => {
    time = t;
    deck.setProps({ layers: layers() });
  });
  if (!ctx.preview) {
    slider(controlBar(el), 'pulseAmount', 0, 1, 0.05, amount, (v) => {
      amount = v;
    });
    readout(el, 'instancePhase is a new instanced attribute (getPhase); the vertex shader reads it in an injected DECKGL_FILTER_SIZE.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
