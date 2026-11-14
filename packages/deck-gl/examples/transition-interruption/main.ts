// transitionInterruption: what a second move does to a transition already running
import { Deck, TRANSITION_EVENTS } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const MODES = { BREAK: TRANSITION_EVENTS.BREAK, SNAP_TO_END: TRANSITION_EVENTS.SNAP_TO_END, IGNORE: TRANSITION_EVENTS.IGNORE };
type Mode = keyof typeof MODES;

const STOPS: Record<string, MapViewState> = {
  Lisbon: { longitude: -9.1, latitude: 38.7, zoom: 3.5 },
  Cairo: { longitude: 31.2, latitude: 30, zoom: 3.5 },
  Delhi: { longitude: 77.2, latitude: 28.6, zoom: 3.5 },
  Tokyo: { longitude: 139.7, latitude: 35.7, zoom: 3.5 },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let mode: Mode = ctx.preview ? 'BREAK' : 'BREAK';
  const log: string[] = [];
  const label = ctx.preview ? null : readout(el, 'Click two cities quickly.');

  const deck = new Deck({
    device: stage.device,
    initialViewState: STOPS.Lisbon!,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: 4,
        radiusUnits: 'pixels',
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const note = (text: string): void => {
    log.unshift(text);
    log.length = Math.min(log.length, 4);
    if (label) label.textContent = log.join('\n');
  };

  const flyTo = (name: string): void => {
    note(`request ${name} (${mode})`);
    deck.setProps({
      initialViewState: {
        ...STOPS[name]!,
        transitionDuration: 3000,
        transitionInterruption: MODES[mode],
        onTransitionStart: () => note(`onTransitionStart -> ${name}`),
        onTransitionInterrupt: () => note(`onTransitionInterrupt (${name})`),
        onTransitionEnd: () => note(`onTransitionEnd -> ${name}`),
      },
    });
  };

  let timer = 0;
  if (ctx.preview) {
    const names = Object.keys(STOPS);
    let i = 0;
    // A new request every 1.4 s, each cutting the previous 3 s move short (BREAK).
    timer = window.setInterval(() => flyTo(names[++i % names.length]!), 1400);
  } else {
    const bar = controlBar(el);
    select(bar, 'transitionInterruption', Object.keys(MODES) as Mode[], (v) => (mode = v), mode);
    for (const name of Object.keys(STOPS)) button(bar, name, () => flyTo(name));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
