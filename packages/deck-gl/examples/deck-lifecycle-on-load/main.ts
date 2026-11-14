// Deck lifecycle: isInitialized false after the constructor, true in onLoad
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1 };
  const log = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let lines: string[] = [];
  const say = (line: string): void => {
    lines.push(line);
    log.textContent = lines.join('\n');
  };

  let deck: Deck;
  const build = (): Deck => {
    lines = [];
    const t0 = performance.now();
    const d: Deck = new Deck({
      device: stage.device,
      initialViewState: view,
      controller: !ctx.preview,
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
      // Once, after the gl context and Deck's managers exist: now viewport transitions are safe.
      onLoad: () => say(`onLoad after ${(performance.now() - t0).toFixed(0)} ms: isInitialized = ${d.isInitialized}`),
    });
    say(`constructor returned: isInitialized = ${d.isInitialized}`);
    return d;
  };
  deck = build();

  // Rebuilding a Deck on the same device shows the sequence again.
  const rebuild = (): void => {
    deck.finalize();
    deck = build();
  };
  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    timer = window.setInterval(rebuild, 3500);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(10 + t * 8) } }));
  } else {
    button(controlBar(el), 'Build a new Deck', rebuild);
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
