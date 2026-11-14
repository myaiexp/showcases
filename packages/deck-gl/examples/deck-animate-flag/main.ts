// Deck _animate: redraw every frame even when no prop changed, via _onMetrics
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 25, zoom: ctx.preview ? 0.6 : 1.4 };
  const label = ctx.preview ? overlay(stage.box, 'waiting for metrics...', 'bottom') : readout(el, 'waiting for the first metrics callback (once a second)...');
  let animateFlag = false;

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    _animate: animateFlag,
    // Called once a second with counters for the last second.
    _onMetrics: (m) => {
      label.textContent = `_animate: ${animateFlag}   framesRedrawn: ${m.framesRedrawn}   fps: ${Math.round(m.fps)}`;
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: 5,
        radiusUnits: 'pixels',
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const set = (v: boolean): void => {
    animateFlag = v;
    deck.setProps({ _animate: v });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => set(!animateFlag), 2500);
  } else {
    const bar = controlBar(el);
    check(bar, '_animate', false, set);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
