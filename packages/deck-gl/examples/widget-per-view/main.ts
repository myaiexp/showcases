// Widgets per view: viewId pins a widget to one of two MapViews
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget, FullscreenWidget, ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { clickEvery, drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const left: MapViewState = { longitude: 10, latitude: 45, zoom: ctx.preview ? 1.4 : 2.6 };
  const right: MapViewState = { longitude: 78, latitude: 22, zoom: ctx.preview ? 1.4 : 2.6, pitch: 45, bearing: 20 };

  const deck = new Deck<MapView[]>({
    device: stage.device,
    views: [
      new MapView({ id: 'left', x: 0, y: 0, width: '50%', controller: !ctx.preview }),
      new MapView({ id: 'right', x: '50%', y: 0, width: '50%', controller: !ctx.preview }),
    ],
    initialViewState: { left, right },
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
    // The built-in widgets are typed for a views-less Deck, so the array is cast for the two-view deck.
    widgets: [
      // No viewId: lives in the shared root container, over both views.
      new FullscreenWidget({ placement: 'bottom-right', container: stage.box }),
      // Each of these only controls (and sits in) its own view.
      new ZoomWidget({ id: 'zoom-left', viewId: 'left', placement: 'top-left' }),
      new ZoomWidget({ id: 'zoom-right', viewId: 'right', placement: 'top-left' }),
      new CompassWidget({ id: 'compass-right', viewId: 'right', placement: 'top-right' }),
    ] as never[],
  });

  // A card drifts both views and presses each view's own zoom button in turn.
  const stopDrift = ctx.preview ? animate((t) => deck.setProps({ viewState: { left: drift(left, t, 4), right: drift(right, t, 4) } })) : () => {};
  const press = ctx.preview ? clickEvery(stage.box, ['.deck-widget-zoom-in', '.deck-widget-compass button'], 2000) : () => {};
  return () => {
    stopDrift();
    press();
    stage.release(deck);
  };
};

export default mount;
