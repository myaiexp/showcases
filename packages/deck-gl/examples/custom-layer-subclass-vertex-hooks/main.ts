// Subclassing with vertex hooks: #decl, #main-start, DECKGL_FILTER_SIZE and _COLOR
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { SweepScatterplotLayer } from './sweep-scatterplot-layer.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const state = { lng: -150, width: 25 };

  const layers = (): [ReturnType<typeof landLayer>, SweepScatterplotLayer<City>] => [
    landLayer(),
    new SweepScatterplotLayer<City>({
      id: 'sweep',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 50_000,
      getFillColor: [255, 140, 60, 220],
      radiusMinPixels: 4,
      sweepLng: state.lng,
      sweepWidth: state.width,
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  // The band sweeps from -180 to 180 degrees of longitude, then starts over.
  const stop = animate((t) => {
    state.lng = ((t * 30) % 360) - 180;
    deck.setProps({ layers: layers() });
  });
  if (!ctx.preview) {
    slider(controlBar(el), 'sweepWidth', 5, 60, 1, state.width, (v) => {
      state.width = v;
    });
    readout(el, 'The band is computed in the vertex shader from each dot\'s own longitude; no attribute changes.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
