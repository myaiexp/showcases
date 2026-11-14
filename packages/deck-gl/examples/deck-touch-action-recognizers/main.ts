// Deck touchAction and eventRecognizerOptions, read once at construction
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const ACTIONS = ['none', 'pan-y', 'pan-x', 'manipulation'] as const;
type Action = (typeof ACTIONS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.2 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let touchAction: Action = 'none';
  let threshold = 1;
  let drags = 0;

  const show = (): void => {
    // The event manager writes touch-action onto the element it listens on.
    const css = getComputedStyle(stage.canvas).touchAction;
    label.textContent = `touchAction: '${touchAction}' -> canvas CSS touch-action: ${css}\npan threshold: ${threshold} px   drags started: ${drags}`;
  };

  const build = (): Deck =>
    new Deck({
      device: stage.device,
      initialViewState: view,
      controller: !ctx.preview,
      // "none" captures every touch; "pan-y" lets a vertical swipe scroll the page instead.
      touchAction,
      eventRecognizerOptions: { pan: { threshold } },
      onDragStart: () => {
        drags++;
        show();
      },
      layers: [
        landLayer(),
        new ScatterplotLayer<City>({
          id: 'cities',
          data: CITIES,
          getPosition: (c) => c.coordinates,
          getRadius: (c) => Math.sqrt(c.population) * 60_000,
          getFillColor: [255, 140, 60, 220],
          radiusMinPixels: 2,
        }),
      ],
    });
  let deck = build();
  const rebuild = (): void => {
    deck.finalize();
    deck = build();
    show();
  };
  show();

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      touchAction = ACTIONS[++i % ACTIONS.length]!;
      rebuild();
    }, 1800);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(10 + t * 8) } }));
  } else {
    const bar = controlBar(el);
    select(bar, 'touchAction', ACTIONS, (v) => {
      touchAction = v;
      rebuild();
    }, touchAction);
    slider(bar, 'pan threshold (px)', 1, 40, 1, threshold, (v) => {
      threshold = v;
      rebuild();
    });
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
