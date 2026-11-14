// Subclassing with getShaders: an injected fragment hook and a uniform
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { DonutScatterplotLayer } from './donut-scatterplot-layer.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };

  const layers = (holeRatio: number): [ReturnType<typeof landLayer>, DonutScatterplotLayer<City>] => [
    landLayer(),
    new DonutScatterplotLayer<City>({
      id: 'donuts',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 60_000,
      getFillColor: [255, 140, 60, 230],
      radiusMinPixels: 5,
      holeRatio,
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(0.5) });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: layers(0.5 + 0.4 * Math.sin(t * 1.2)) }));
  } else {
    slider(controlBar(el), 'holeRatio', 0, 1, 0.05, 0.5, (v) => deck.setProps({ layers: layers(v) }));
    readout(el, "inject: { 'fs:DECKGL_FILTER_COLOR': 'if (length(geometry.uv) < donut.inner) discard;' }");
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
