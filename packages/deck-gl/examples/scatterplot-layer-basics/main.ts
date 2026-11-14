// A ScatterplotLayer of cities: radius in meters from population, colour from the same value
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0 : 1.2 };

  const build = (radiusScale: number): ScatterplotLayer<City> =>
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      // Meters: sqrt keeps the circle's area proportional to the population.
      getRadius: (d) => Math.sqrt(d.population) * 40_000,
      // A global multiplier applied on top of every getRadius.
      radiusScale,
      // Warmer and brighter for bigger cities.
      getFillColor: (d) => [255, 90 + Math.min(d.population, 30) * 5, 70 + Math.min(d.population, 30) * 3, 200],
      radiusMinPixels: 2,
      pickable: true,
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    getTooltip: ({ object }) => (object ? `${(object as City).name}: ${(object as City).population} M` : null),
    layers: [landLayer(), build(1)],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) =>
      deck.setProps({
        viewState: { ...INITIAL_VIEW_STATE, longitude: ((10 + t * 8 + 180) % 360) - 180 },
        layers: [landLayer(), build(0.7 + 0.5 * Math.sin(t * 1.4))],
      }),
    );
  } else {
    const bar = controlBar(el);
    slider(bar, 'radiusScale', 0.2, 3, 0.1, 1, (v) => deck.setProps({ layers: [landLayer(), build(v)] }));
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
