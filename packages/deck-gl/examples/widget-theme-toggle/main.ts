// ThemeWidget: a light and dark switch that restyles every widget on the map
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget, ScreenshotWidget, ThemeWidget, ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { clickEvery, drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 1.2 : 2.2, pitch: 30 };
  const log = ctx.preview ? null : readout(el, 'Click the theme button (top right).');

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      new ZoomWidget({ placement: 'top-left' }),
      new CompassWidget({ placement: 'top-left' }),
      new ScreenshotWidget({ placement: 'top-left', onCapture: () => {} }),
      // Uncontrolled: the widget keeps its own mode, starting from initialThemeMode.
      new ThemeWidget({
        placement: 'top-right',
        initialThemeMode: 'dark',
        onThemeModeChange: (mode) => {
          if (log) log.textContent = `onThemeModeChange: ${mode}`;
        },
      }),
    ],
  });

  // In a card the theme button is pressed from code, so both themes show up.
  const stopDrift = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t, 4) })) : () => {};
  const press = ctx.preview ? clickEvery(stage.box, '.deck-widget-theme button', 2500) : () => {};
  return () => {
    stopDrift();
    press();
    stage.release(deck);
  };
};

export default mount;
