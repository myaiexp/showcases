// transitions: interpolate getPosition and getFillColor with duration and easing
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, select, slider } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** Easing functions map [0, 1] to [0, 1]. */
const EASINGS = {
  linear: (t: number) => t,
  'ease in out': (t: number) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t)),
  'ease out cubic': (t: number) => 1 - (1 - t) ** 3,
  'ease out back': (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2,
};
type EasingName = keyof typeof EASINGS;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : null;
  let round = 0;
  let duration = 1400;
  let easing: EasingName = 'ease out back';

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data: pointCloud(70, { seed: 30 + round, spread: 2.4 }),
      getPosition: (d) => d.position,
      getFillColor: (d) => (round % 2 ? [90, 190 + d.value * 60, 255] : [255, 130 + d.value * 100, 70]),
      getRadius: 8,
      radiusUnits: 'pixels',
      // A number is a duration; an object adds the easing function.
      transitions: {
        getPosition: { duration, easing: EASINGS[easing] },
        getFillColor: duration,
      },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const go = (): void => {
    round += 1;
    deck.setProps({ layers: layers() });
    if (label) label.textContent = `transition ${round}: ${duration} ms, ${easing}`;
  };

  let timer = 0;
  if (ctx.preview) timer = window.setInterval(go, 2200);
  else {
    const bar = controlBar(el);
    select(bar, 'easing', Object.keys(EASINGS) as EasingName[], (v) => (easing = v), easing);
    slider(bar, 'duration ms', 200, 3000, 100, duration, (v) => (duration = v));
    button(bar, 'Move the points', go);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
