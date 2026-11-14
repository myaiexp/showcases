// PostProcessEffect with brightnessContrast from @luma.gl/effects, props changed from sliders
import { Deck, PostProcessEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { brightnessContrast } from '@luma.gl/effects';
import type { BrightnessContrastProps } from '@luma.gl/effects';
import type { Mount } from '@/types.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { CITIES, routes, type City, type Route } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const ROUTES = routes(['London', 'Dubai', 'Singapore'], 4);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 40, latitude: 28, zoom: ctx.preview ? 0.9 : 1.4 };
  // brightness and contrast both run from -1 to 1; 0 leaves the image alone.
  const props: Required<BrightnessContrastProps> = { brightness: 0, contrast: 0 };
  const effect = new PostProcessEffect(brightnessContrast, props);

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effect],
    layers: [
      landLayer(),
      new ArcLayer<Route>({
        id: 'arcs',
        data: ROUTES,
        getSourcePosition: (d) => d.from.coordinates,
        getTargetPosition: (d) => d.to.coordinates,
        getSourceColor: [90, 200, 255, 160],
        getTargetColor: [255, 160, 90, 160],
        getWidth: 1.5,
        antialiasing: true, // an effect renders offscreen without MSAA: let the shader smooth the edges
      }),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 190, 90],
        radiusMinPixels: 3,
      }),
    ],
  });
  const apply = (): void => {
    // The effect keeps the props object it is given: hand it a fresh copy, then redraw.
    effect.setProps({ ...props });
    deck.redraw('effect props changed');
  };

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      props.brightness = 0.15 * Math.sin(t * 1.4);
      props.contrast = 0.3 * Math.sin(t * 0.9);
      apply();
      deck.setProps({ viewState: { ...view, longitude: wrapLng(40 + t * 4) } });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'brightness', -1, 1, 0.05, 0, (v) => {
      props.brightness = v;
      apply();
    });
    slider(bar, 'contrast', -1, 1, 0.05, 0, (v) => {
      props.contrast = v;
      apply();
    });
    button(bar, 'reset', () => {
      props.brightness = 0;
      props.contrast = 0;
      apply();
      bar.querySelectorAll('input').forEach((i) => {
        i.value = '0';
        i.dispatchEvent(new Event('input'));
      });
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
