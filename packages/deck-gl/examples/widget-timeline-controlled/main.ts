// TimelineWidget in controlled mode: the app owns time and playing, the widget only reports
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _TimelineWidget as TimelineWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.4 : 1.3 };
  const log = ctx.preview ? null : readout(el);
  const state = { time: 0, playing: false };
  let timer = 0;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      // Cities swell from nothing as time passes, largest first.
      getRadius: (d) => Math.sqrt(d.population) * 60_000 * Math.min(1, Math.max(0, state.time / 50 - 1 + d.population / 40)),
      updateTriggers: { getRadius: state.time },
      getFillColor: [255, 140, 60],
      radiusMinPixels: 1,
    }),
  ];

  const apply = (): void => {
    // time and playing are props: the widget shows whatever the app last gave it.
    timeline.setProps({ time: state.time, playing: state.playing });
    deck.setProps({ layers: layers() });
    if (log) log.textContent = `app state: time ${state.time}, playing ${state.playing}`;
  };
  const startTimer = (): void => {
    window.clearInterval(timer);
    if (state.playing) {
      timer = window.setInterval(() => {
        state.time = state.time >= 100 ? 0 : state.time + 2;
        apply();
      }, ctx.preview ? 90 : 140);
    }
  };

  const timeline = new TimelineWidget({
    placement: 'bottom-left',
    timeRange: [0, 100],
    time: state.time,
    playing: state.playing,
    onTimeChange: (t) => {
      state.time = t;
      apply();
    },
    onPlayingChange: (playing) => {
      state.playing = playing;
      startTimer();
      apply();
    },
  });

  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    widgets: [timeline],
  });

  if (ctx.preview) {
    state.playing = true;
    startTimer();
    apply();
  } else {
    const bar = controlBar(el);
    button(bar, 'Jump to 0', () => { state.time = 0; apply(); });
    button(bar, 'Jump to 80', () => { state.time = 80; apply(); });
    button(bar, 'Toggle play', () => { state.playing = !state.playing; startTimer(); apply(); });
    apply();
  }
  return () => {
    window.clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
