// Two MapViews share one canvas via x and width, one viewState keeps them in step
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { worldView } from '../../shared/views-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let shared: MapViewState = worldView(ctx.preview, { zoom: ctx.preview ? 0.4 : 1.3 });
  // With several views, viewState is keyed by view id; both ids hold the same state.
  const both = (s: MapViewState) => ({ left: s, right: s });
  if (!ctx.preview) readout(el, 'Drag or scroll either map: the other follows, because both read one viewState.');

  const deck = new Deck({
    device: stage.device,
    // Each view takes half of the canvas width. A percentage is resolved when the canvas resizes.
    views: [
      new MapView({ id: 'left', x: 0, width: 'calc(50% - 1px)', controller: !ctx.preview }),
      new MapView({ id: 'right', x: 'calc(50% + 1px)', width: 'calc(50% - 1px)', controller: !ctx.preview }),
    ],
    viewState: both(shared),
    // The controllers report a new state; storing it as the viewState prop moves both views.
    onViewStateChange: ({ viewState: next }) => {
      shared = next as MapViewState;
      deck.setProps({ viewState: both(shared) });
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 60_000,
        radiusMinPixels: 2,
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: both({ ...shared, longitude: wrapLng(10 + t * 14), latitude: 28 + Math.sin(t * 0.5) * 18 }) }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
