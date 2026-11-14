// Prop types decide what counts as a change: equal colours, new closures and equal objects do not update
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { GaugeDotLayer, stats } from './gauge-dot-layer.ts';

const BIG = CITIES.filter((c) => c.population >= 10);
const COLORS: [number, number, number][] = [[255, 204, 0], [90, 220, 255], [255, 120, 160]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 40, latitude: 25, zoom: ctx.preview ? 1.1 : 1.7 };
  const state = { color: 0, width: 4 };
  stats.updates = 0;
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let last = 'initial render';
  const show = (what: string): void => {
    last = what;
    label.textContent = `${what}\nGaugeDotLayer.updateState calls: ${stats.updates}`;
  };

  const layers = (): [ReturnType<typeof landLayer>, GaugeDotLayer<City>] => [
    landLayer(),
    new GaugeDotLayer<City>({
      id: 'gauges',
      data: BIG,
      getPosition: (d) => d.coordinates, // a new closure every call: the accessor type ignores that
      getValue: (d) => d.population,
      ringWidth: state.width,
      ringColor: [...COLORS[state.color]!] as Color, // a new array every call: the color type compares values
      formatLabel: (v) => `${v}M`, // a new function every call: the function type ignores it
      style: { glow: true }, // a new object every call: compare: true compares its contents
    }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    // updateState runs during a render, so the count is read after it.
    onAfterRender: () => show(last),
  });
  const refresh = (what: string): void => {
    deck.setProps({ layers: layers() });
    show(what);
  };

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(40 + t * 4) } }));
    let n = 0;
    timer = window.setInterval(() => {
      n++;
      if (n % 3 === 0) state.color = (state.color + 1) % COLORS.length; // a real change
      refresh(n % 3 === 0 ? 'new colour value: updates' : 'same props, new closures: no update');
    }, 1000);
  } else {
    const bar = controlBar(el);
    button(bar, 're-render, same props', () => refresh('same props, new closures, new arrays: no update'));
    button(bar, 'next ringColor', () => {
      state.color = (state.color + 1) % COLORS.length;
      refresh('ringColor has new values: updates');
    });
    slider(bar, 'ringWidth', 1, 12, 1, state.width, (v) => {
      state.width = v;
      refresh('ringWidth changed (number type, ===): updates');
    });
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
