// A minimap: two overlapping MapViews, a viewState per view id, one following
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type States = { main: MapViewState; minimap: MapViewState };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const [lng, lat] = city('Paris').coordinates;
  let states: States = {
    main: { longitude: lng, latitude: lat, zoom: ctx.preview ? 4 : 5, pitch: 40 },
    minimap: { longitude: lng, latitude: lat, zoom: ctx.preview ? 0.6 : 1.4 },
  };
  if (!ctx.preview) readout(el, 'Drag the big map: the minimap follows it. Scroll in the minimap: only its zoom changes.');

  const deck = new Deck({
    device: stage.device,
    views: [
      new MapView({ id: 'main', controller: !ctx.preview }),
      new MapView({
        id: 'minimap',
        x: 10,
        y: 10,
        width: ctx.preview ? 96 : 220,
        height: ctx.preview ? 76 : 160,
        controller: !ctx.preview,
        // The minimap is drawn over the main view, so it clears the pixels beneath it first.
        clear: true,
        clearColor: [20, 40, 66, 255],
      }),
    ],
    viewState: states,
    onViewStateChange: ({ viewId, viewState }) => {
      const next = viewState as MapViewState;
      states =
        viewId === 'main'
          ? { main: next, minimap: { ...states.minimap, longitude: next.longitude, latitude: next.latitude } }
          : { main: states.main, minimap: { ...states.minimap, zoom: next.zoom } };
      deck.setProps({ viewState: states });
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        radiusUnits: 'pixels',
        getRadius: 4,
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => {
        const main = { ...states.main, longitude: wrapLng(lng + Math.sin(t * 0.5) * 30), latitude: lat + Math.cos(t * 0.4) * 8, bearing: t * 8 };
        states = { main, minimap: { ...states.minimap, longitude: main.longitude, latitude: main.latitude } };
        deck.setProps({ viewState: states });
      })
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
