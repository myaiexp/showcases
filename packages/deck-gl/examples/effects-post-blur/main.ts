// Blur passes from @luma.gl/effects as PostProcessEffects: gaussian, triangle, zoom and tilt-shift
import { Deck, PostProcessEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { gaussianBlur, tiltShift, triangleBlur, zoomBlur } from '@luma.gl/effects';
import type { ShaderPass } from '@luma.gl/shadertools';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const KINDS = ['gaussianBlur', 'triangleBlur', 'zoomBlur', 'tiltShift'] as const;
type Kind = (typeof KINDS)[number];

const make = (kind: Kind, amount: number): PostProcessEffect<ShaderPass> => {
  switch (kind) {
    case 'gaussianBlur':
      return new PostProcessEffect(gaussianBlur, { radius: amount * 20 });
    case 'triangleBlur':
      return new PostProcessEffect(triangleBlur, { radius: amount * 40 });
    case 'zoomBlur':
      return new PostProcessEffect(zoomBlur, { center: [0.5, 0.5], strength: amount * 0.5 });
    case 'tiltShift':
      // A line from start to end stays sharp; blur grows with distance from it.
      return new PostProcessEffect(tiltShift, { start: [0, 0.5], end: [1, 0.5], blurRadius: amount * 40, gradientRadius: 150 });
  }
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 38, zoom: ctx.preview ? 2.4 : 3.2 };
  let kind: Kind = ctx.preview ? 'tiltShift' : 'gaussianBlur';
  let amount = 0.4;

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [make(kind, amount)],
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 30_000,
        getFillColor: [255, 150, 70],
        radiusMinPixels: 4,
      }),
      new TextLayer<City>({
        id: 'names',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getText: (d) => d.name,
        getSize: 13,
        getColor: [235, 240, 250],
        getTextAnchor: 'start',
        getPixelOffset: [8, 0],
      }),
    ],
  });
  // The effect object is bound to one shader module: another kind needs a new effect.
  const rebuild = (): void => deck.setProps({ effects: [make(kind, amount)] });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      kind = KINDS[++i % KINDS.length]!;
      rebuild();
    }, 2000);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: 15 + Math.sin(t * 0.4) * 8 } }));
  } else {
    const bar = controlBar(el);
    select(bar, 'effect', KINDS, (v) => {
      kind = v;
      rebuild();
    });
    slider(bar, 'amount', 0, 1, 0.05, amount, (v) => {
      amount = v;
      rebuild();
    });
    readout(el, 'gaussianBlur and triangleBlur take a radius, zoomBlur a strength, tiltShift a blurRadius along a line.');
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
