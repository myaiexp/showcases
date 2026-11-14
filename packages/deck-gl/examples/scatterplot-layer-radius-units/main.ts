// ScatterplotLayer radiusUnits: meters and common units scale with the map, pixels do not
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Units = 'meters' | 'common' | 'pixels';

/** The same population maps to very different numbers in each unit. */
const RADIUS: Record<Units, (d: City) => number> = {
  meters: (d) => Math.sqrt(d.population) * 40_000,
  common: (d) => Math.sqrt(d.population) * 0.3,
  pixels: (d) => Math.sqrt(d.population) * 2.5,
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 0 : 1.2 };
  let units: Units = 'meters';

  const layers = (): [ReturnType<typeof landLayer>, ScatterplotLayer<City>] => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: RADIUS[units],
      // 'meters' (default): ground distance. 'common': one unit of the projected world.
      // 'pixels': screen size, fixed while zooming.
      radiusUnits: units,
      getFillColor: [255, 140, 60, 190],
    }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    const all: Units[] = ['meters', 'pixels', 'common'];
    stop = animate((t) => {
      units = all[Math.floor(t / 2.5) % 3]!;
      deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, zoom: 0.4 + Math.sin(t * 0.9) * 0.8 }, layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'Scroll to zoom: meters and common circles grow with the map, pixel circles do not.');
    select(bar, 'radiusUnits', ['meters', 'common', 'pixels'] as const, (v) => { units = v; deck.setProps({ layers: layers() }); info.textContent = `radiusUnits: '${v}'`; }, 'meters');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
