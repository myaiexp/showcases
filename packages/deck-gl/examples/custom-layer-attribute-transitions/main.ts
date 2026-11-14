// Attribute transitions: a custom layer's height and colour interpolate on change
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, seeded, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { BarLayer } from './bar-layer.ts';

const rand = seeded(9);
const BIG = CITIES.filter((c) => c.population >= 5);
/** Two "measurements" per city: the layer's accessor reads one or the other. */
const SERIES = BIG.map(() => [rand(), rand()] as const);

function colorOf(v: number): Color {
  return [Math.round(60 + 195 * v), Math.round(200 - 110 * v), Math.round(255 - 180 * v), 240];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 25, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const state = { series: 0, duration: 900 };

  const layers = (): [ReturnType<typeof landLayer>, BarLayer<City>] => [
    landLayer(),
    new BarLayer<City>({
      id: 'bars',
      data: BIG,
      getPosition: (d) => d.coordinates,
      getHeight: (d) => 6 + 90 * SERIES[BIG.indexOf(d)]![state.series]!,
      getColor: (d) => colorOf(SERIES[BIG.indexOf(d)]![state.series]!),
      widthPixels: ctx.preview ? 8 : 14,
      // The accessors are new closures each time: the trigger tells the layer to recompute them,
      // and `transitions` (keyed by accessor name) animates from the old values to the new.
      updateTriggers: { getHeight: state.series, getColor: state.series },
      transitions: { getHeight: { duration: state.duration, easing: (t: number) => 1 - (1 - t) ** 3 }, getColor: state.duration },
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const swap = (): void => {
    state.series = 1 - state.series;
    deck.setProps({ layers: layers() });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(swap, 1800);
  } else {
    const bar = controlBar(el);
    readout(el, 'swap series: the getHeight and getColor triggers change, the attributes recompute, the buffers interpolate');
    button(bar, 'swap series', swap);
    slider(bar, 'transition ms', 0, 3000, 100, state.duration, (v) => {
      state.duration = v;
    });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
