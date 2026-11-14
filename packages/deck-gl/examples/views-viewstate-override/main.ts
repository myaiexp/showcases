// A View's viewState prop extends a shared view state: an overview that pins zoom, pitch and bearing
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const [lng, lat] = city('Istanbul').coordinates;
  let main: MapViewState = { longitude: lng, latitude: lat, zoom: ctx.preview ? 3.6 : 4.5, pitch: 45, bearing: 30 };

  const makeViews = (overviewZoom: number) => [
    new MapView({ id: 'main', controller: !ctx.preview }),
    new MapView({
      id: 'overview',
      x: 10,
      y: 10,
      width: ctx.preview ? 100 : 200,
      height: ctx.preview ? 100 : 200,
      clear: true,
      clearColor: [20, 40, 66, 255],
      // An object with an id selects the 'main' view state and overrides these fields on a copy:
      // the overview follows the main view's centre but always looks straight down at one zoom.
      viewState: { id: 'main', zoom: overviewZoom, pitch: 0, bearing: 0 },
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    views: makeViews(ctx.preview ? 1.2 : 1.8),
    viewState: { main },
    onViewStateChange: ({ viewState }) => {
      main = viewState as MapViewState;
      deck.setProps({ viewState: { main } });
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      main = { ...main, longitude: wrapLng(lng + Math.sin(t * 0.4) * 25), bearing: 30 + t * 12 };
      deck.setProps({ viewState: { main } });
    });
  } else {
    slider(controlBar(el), 'overview zoom', 0, 5, 0.1, 1.8, (z) => deck.setProps({ views: makeViews(z) }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
