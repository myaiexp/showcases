// ScatterplotLayer outlines: filled, stroked, getLineColor, getLineWidth and units
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Units = 'meters' | 'common' | 'pixels';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.2 : 1.3 };
  const state = { filled: true, stroked: true, units: 'pixels' as Units, scale: 1 };
  const widthFor = (u: Units): number => (u === 'pixels' ? 3 : u === 'meters' ? 60_000 : 0.4);

  const layers = (): [ReturnType<typeof landLayer>, ScatterplotLayer<City>] => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 40_000,
      radiusMinPixels: 4,
      filled: state.filled,
      getFillColor: [40, 60, 90, 220],
      stroked: state.stroked,
      getLineColor: (d) => (d.population > 15 ? [255, 120, 80] : [120, 220, 255]),
      getLineWidth: widthFor(state.units),
      lineWidthUnits: state.units,
      lineWidthScale: state.scale,
      lineWidthMinPixels: 1,
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
    stop = animate((t) => {
      state.filled = Math.floor(t / 2.5) % 2 === 0;
      state.scale = 1 + 1.5 * Math.abs(Math.sin(t));
      update();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'filled', true, (v) => { state.filled = v; update(); });
    check(bar, 'stroked', true, (v) => { state.stroked = v; update(); });
    select(bar, 'lineWidthUnits', ['pixels', 'meters', 'common'] as const, (v) => { state.units = v; update(); }, 'pixels');
    slider(bar, 'lineWidthScale', 0.5, 5, 0.1, 1, (v) => { state.scale = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
