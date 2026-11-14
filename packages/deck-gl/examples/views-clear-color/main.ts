// View clear and clearColor: an inset that wipes what is beneath it, or draws over the main map
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Rgba = [number, number, number, number];
const COLORS: Record<string, Rgba | false> = {
  'navy [20, 40, 66, 255]': [20, 40, 66, 255],
  'dark red [90, 20, 30, 255]': [90, 20, 30, 255],
  'half clear [200, 220, 255, 90]': [200, 220, 255, 90],
  'default [0, 0, 0, 0]': [0, 0, 0, 0],
  'false (leave the pixels)': false,
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const [lng, lat] = city('Berlin').coordinates;
  const main: MapViewState = { longitude: lng, latitude: lat, zoom: ctx.preview ? 3.2 : 4, pitch: 30 };
  const inset: MapViewState = { longitude: 140, latitude: 36, zoom: ctx.preview ? 2.2 : 3 };

  const makeViews = (clear: boolean, clearColor: Rgba | false) => [
    new MapView({ id: 'main', controller: !ctx.preview }),
    new MapView({
      id: 'inset',
      x: ctx.preview ? 12 : 20,
      y: ctx.preview ? 12 : 20,
      width: ctx.preview ? 150 : '45%',
      height: ctx.preview ? 110 : '55%',
      clear,
      clearColor,
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    views: makeViews(true, COLORS['navy [20, 40, 66, 255]']!),
    // The inset has no controller and no entry of its own, so it takes the one fixed state below.
    viewState: { main, inset },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 5, getFillColor: [255, 170, 70] }),
    ],
  });

  let timer = 0;
  if (ctx.preview) {
    const names = Object.keys(COLORS);
    let i = 0;
    const next = (): void => {
      const color = COLORS[names[i++ % names.length]!]!;
      deck.setProps({ views: makeViews(true, color) });
    };
    timer = window.setInterval(next, 1800);
  } else {
    let clear = true;
    let color: Rgba | false = COLORS['navy [20, 40, 66, 255]']!;
    const bar = controlBar(el);
    check(bar, 'clear: true', true, (v) => { clear = v; deck.setProps({ views: makeViews(clear, color) }); });
    select(bar, 'clearColor', Object.keys(COLORS), (k) => { color = COLORS[k]!; deck.setProps({ views: makeViews(clear, color) }); });
  }
  const stop = ctx.preview ? animate(() => {}) : () => {};
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
