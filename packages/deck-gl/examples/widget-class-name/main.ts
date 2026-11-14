// Class theming: the className prop plus CSS variables set on that class in a stylesheet
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget, FullscreenWidget, ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 1.2 : 2.2, pitch: 30 };

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
      // The class sets the variables (see style.css); `.deck-widget-fullscreen` could do the same per type.
      new ZoomWidget({ placement: 'top-left', className: 'neon' }),
      new CompassWidget({ placement: 'top-left', className: 'neon' }),
      // No class: the stylesheet defaults.
      new FullscreenWidget({ placement: 'top-right', container: stage.box }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t, 4) })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
