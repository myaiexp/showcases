// TextLayer sizeUnits, sizeScale and the min/max pixel clamps for labels sized in meters
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Units = 'pixels' | 'meters' | 'common';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 15, latitude: 40, zoom: ctx.preview ? 1.4 : 2.4 };
  const data = CITIES.filter((c) => c.population >= 12);
  const state = { units: 'meters' as Units, scale: 1, min: 8, max: 40 };
  const sizeFor = (u: Units): number => (u === 'pixels' ? 16 : u === 'meters' ? 300_000 : 2.5);

  const layers = (): [ReturnType<typeof landLayer>, TextLayer<City>] => [
    landLayer(),
    new TextLayer<City>({
      id: 'names',
      data,
      getText: (d) => d.name,
      getPosition: (d) => d.coordinates,
      getSize: sizeFor(state.units),
      sizeUnits: state.units,
      sizeScale: state.scale,
      // Clamps for meter and common sizes, which otherwise shrink to dots and balloon on zoom.
      sizeMinPixels: state.min,
      sizeMaxPixels: state.max,
      getColor: [255, 214, 120],
      characterSet: 'auto',
    }),
  ];
  const update = (): void => deck.setProps({ layers: layers() });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, zoom: 1.4 + Math.sin(t * 0.9) * 0.8 } }));
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'Zoom in and out: meter labels grow with the map until sizeMaxPixels stops them.');
    select(bar, 'sizeUnits', ['meters', 'common', 'pixels'] as const, (v) => { state.units = v; update(); info.textContent = `sizeUnits: '${v}'`; }, 'meters');
    slider(bar, 'sizeScale', 0.3, 3, 0.1, 1, (v) => { state.scale = v; update(); });
    slider(bar, 'sizeMinPixels', 0, 30, 1, 8, (v) => { state.min = v; update(); });
    slider(bar, 'sizeMaxPixels', 10, 100, 1, 40, (v) => { state.max = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
