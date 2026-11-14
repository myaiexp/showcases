// GlobeViewport.project(): HTML labels on the globe, hidden once a city turns to the far side
import { Deck, _GlobeView as GlobeView, _GlobeViewport as GlobeViewport } from '@deck.gl/core';
import { ScatterplotLayer, SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { labelPool, type HtmlLabel } from '../../shared/viewports-html.ts';
import { landLayer } from '../../shared/world.ts';

const RAD = Math.PI / 180;
/** Angle in degrees between two lng/lat points on the sphere. */
function separation(a: [number, number], b: [number, number]): number {
  const c = Math.sin(a[1] * RAD) * Math.sin(b[1] * RAD) + Math.cos(a[1] * RAD) * Math.cos(b[1] * RAD) * Math.cos((a[0] - b[0]) * RAD);
  return Math.acos(Math.max(-1, Math.min(1, c))) / RAD;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#05080d' });
  const labels = labelPool(stage.box);
  const shown = CITIES.filter((c) => c.population >= (ctx.preview ? 15 : 6));
  let view = { longitude: 20, latitude: 20, zoom: ctx.preview ? 0.2 : 0.9 };

  const place = (): void => {
    const { clientWidth: width, clientHeight: height } = stage.box;
    // A standalone GlobeViewport built from the same view state projects like the one drawn.
    const viewport = new GlobeViewport({ width, height, ...view });
    const out: HtmlLabel[] = [];
    for (const c of shown) {
      if (separation(c.coordinates, [view.longitude, view.latitude]) > 75) continue;
      const [x, y] = viewport.project(c.coordinates);
      out.push({ text: c.name, x: x!, y: y! });
    }
    labels.set(out);
  };

  const deck = new Deck({
    device: stage.device,
    views: new GlobeView({ id: 'globe', controller: !ctx.preview }),
    viewState: view,
    onViewStateChange: ({ viewState }) => {
      view = viewState as typeof view;
      deck.setProps({ viewState: view });
    },
    onAfterRender: place,
    layers: [
      new SolidPolygonLayer<[number, number][]>({ id: 'ocean', data: [[[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]]], getPolygon: (d) => d, filled: true, getFillColor: [11, 22, 34] }),
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: shown, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 3.5, getFillColor: [255, 170, 70] }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => {
        view = { longitude: wrapLng(20 + t * 16), latitude: 20 + Math.sin(t * 0.4) * 10, zoom: 0.2 };
        deck.setProps({ viewState: view });
      })
    : () => {};
  return () => {
    stop();
    labels.remove();
    stage.release(deck);
  };
};

export default mount;
