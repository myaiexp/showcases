// Widget tooltips: label, a custom string, an HTML element, or none at all
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget, FullscreenWidget, ScreenshotWidget, ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 35, zoom: ctx.preview ? 1.4 : 2.4, pitch: 20 };
  if (!ctx.preview) readout(el, 'Hover each button: label only, custom string, HTML with a key badge, and no tooltip.');

  // HTML content for a tooltip: any element will do.
  const badge = document.createElement('span');
  badge.innerHTML = 'Zoom in <kbd style="padding:0 4px;border:1px solid currentColor;border-radius:3px">+</kbd>';

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
      // label is the aria-label and, by default, the tooltip text.
      new CompassWidget({ placement: 'top-left', label: 'North up' }),
      // tooltip overrides only what is shown; zoomInTooltip takes an element.
      new ZoomWidget({ placement: 'top-left', zoomInTooltip: badge, zoomOutTooltip: 'Zoom out (-)' }),
      // false hides the visual tooltip but keeps the aria-label.
      new ScreenshotWidget({ placement: 'top-right', label: 'Save a screenshot', tooltip: false, onCapture: () => {} }),
      new FullscreenWidget({ placement: 'top-right', container: stage.box, enterTooltip: 'Go big', exitTooltip: 'Go back' }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t, 4) })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
