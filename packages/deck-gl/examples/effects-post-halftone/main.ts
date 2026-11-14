// Stylising passes from @luma.gl/effects: halftone, dot screen, hexagonal pixelate
import { Deck, PostProcessEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { colorHalftone, dotScreen, hexagonalPixelate, ink } from '@luma.gl/effects';
import type { ShaderPass } from '@luma.gl/shadertools';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const KINDS = ['colorHalftone', 'dotScreen', 'hexagonalPixelate', 'ink'] as const;
type Kind = (typeof KINDS)[number];

/** `size` is in pixels for the dot patterns and the hexagon width; ink uses it as a strength. */
const make = (kind: Kind, size: number): PostProcessEffect<ShaderPass> => {
  switch (kind) {
    case 'colorHalftone':
      return new PostProcessEffect(colorHalftone, { center: [0.5, 0.5], angle: 1.1, size });
    case 'dotScreen':
      return new PostProcessEffect(dotScreen, { center: [0.5, 0.5], angle: 1.1, size });
    case 'hexagonalPixelate':
      return new PostProcessEffect(hexagonalPixelate, { center: [0.5, 0.5], scale: size * 1.5 });
    case 'ink':
      return new PostProcessEffect(ink, { strength: size / 10 });
  }
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1 : 1.6 };
  let kind: Kind = 'colorHalftone';
  let size = ctx.preview ? 6 : 5;

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [make(kind, size)],
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 50_000,
        getFillColor: [255, 150, 70],
        radiusMinPixels: 4,
      }),
    ],
  });
  const rebuild = (): void => deck.setProps({ effects: [make(kind, size)] });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 4) } }));
    let i = 0;
    timer = window.setInterval(() => {
      kind = KINDS[++i % KINDS.length]!;
      rebuild();
    }, 2000);
  } else {
    const bar = controlBar(el);
    select(bar, 'effect', KINDS, (v) => {
      kind = v;
      rebuild();
    });
    slider(bar, 'size', 3, 20, 1, size, (v) => {
      size = v;
      rebuild();
    });
    readout(el, 'The effect module decides the look; size is a dot diameter, hexagon width or ink strength.');
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
