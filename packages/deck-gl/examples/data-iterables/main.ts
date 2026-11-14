// The data prop accepts an array, a Map, a Set or any object with a length field
import { Deck } from '@deck.gl/core';
import type { Layer, MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const MODES = ['Array', 'Map', 'Set', 'object with length'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  const common = { getRadius: 6, radiusUnits: 'pixels', getFillColor: [255, 170, 70] } as const;

  const build = (mode: Mode): Layer => {
    // Array: each accessor receives one element.
    if (mode === 'Array') {
      return new ScatterplotLayer<City>({ id: 'array', ...common, data: [...CITIES], getPosition: (d) => d.coordinates });
    }
    // Map: iterating a Map yields [key, value] entries, so each accessor receives an entry.
    if (mode === 'Map') {
      const byName = new Map(CITIES.map((c) => [c.name, c] as const));
      return new ScatterplotLayer<readonly [string, City]>({
        id: 'map',
        ...common,
        data: byName,
        getPosition: ([, c]) => c.coordinates,
      });
    }
    // Set: iterating yields the members.
    if (mode === 'Set') {
      return new ScatterplotLayer<City>({ id: 'set', ...common, data: new Set(CITIES), getPosition: (d) => d.coordinates });
    }
    // A non-iterable object with `length`: accessors get no object, so they read by index.
    const flat = new Float32Array(CITIES.flatMap((c) => c.coordinates));
    return new ScatterplotLayer({
      id: 'length',
      ...common,
      data: { length: CITIES.length },
      getPosition: (_, { index }) => [flat[index * 2] ?? 0, flat[index * 2 + 1] ?? 0],
    });
  };

  let mode: Mode = 'Array';
  const show = (): void => {
    deck.setProps({ layers: [landLayer(), build(mode)] });
    label.textContent = `data: ${mode}, ${CITIES.length} cities`;
  };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), build(mode)] });
  label.textContent = `data: ${mode}, ${CITIES.length} cities`;

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      mode = MODES[++i % MODES.length]!;
      show();
    }, 1500);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 6) } }));
  } else {
    select(controlBar(el), 'data is a', MODES, (v) => {
      mode = v;
      show();
    }, mode);
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
