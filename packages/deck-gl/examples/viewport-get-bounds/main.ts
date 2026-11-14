// viewport.getBounds(): the visible rectangle of a pitched camera, on a minimap
import { Deck, MapView, WebMercatorViewport } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City, type LngLat } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type States = { main: MapViewState; minimap: MapViewState };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let main: MapViewState = { longitude: 10, latitude: 46, zoom: ctx.preview ? 4.6 : 5, pitch: 45, bearing: 20 };
  const info = ctx.preview ? null : readout(el, 'Rotate (shift-drag) or pan: the footprint on the minimap is viewport.getBounds().');

  const states = (): States => ({ main, minimap: { longitude: 10, latitude: 40, zoom: ctx.preview ? 1.5 : 2.6 } });
  // The main view fills the canvas, so a viewport of that size sees what the camera sees.
  const bounds = (): [number, number, number, number] =>
    new WebMercatorViewport({ ...main, width: stage.box.clientWidth, height: stage.box.clientHeight }).getBounds();

  const layers = () => {
    const [w, s, e, n] = bounds();
    const inside = (c: City): boolean => c.coordinates[0] >= w && c.coordinates[0] <= e && c.coordinates[1] >= s && c.coordinates[1] <= n;
    if (info) info.textContent = `bounds [${[w, s, e, n].map((v) => v.toFixed(1)).join(', ')}]   ${CITIES.filter(inside).length} cities inside`;
    return [
      landLayer(),
      new PathLayer<{ path: LngLat[] }>({
        id: 'footprint',
        data: [{ path: [[w, s], [e, s], [e, n], [w, n], [w, s]] }],
        getPath: (d) => d.path,
        getColor: [255, 190, 90],
        getWidth: 2,
        widthUnits: 'pixels',
      }),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        radiusUnits: 'pixels',
        getRadius: 4,
        getFillColor: (d) => (inside(d) ? [255, 170, 70] : [100, 120, 150]),
        updateTriggers: { getFillColor: [w, s, e, n] },
      }),
    ];
  };

  const deck = new Deck({
    device: stage.device,
    views: [
      new MapView({ id: 'main', controller: !ctx.preview }),
      new MapView({ id: 'minimap', x: 8, y: 8, width: ctx.preview ? 110 : 240, height: ctx.preview ? 80 : 170, clear: true, clearColor: [14, 24, 38, 255] }),
    ],
    viewState: states(),
    // The footprint belongs to the minimap only: draw it nowhere else.
    layerFilter: ({ layer, viewport }) => layer.id !== 'footprint' || viewport.id === 'minimap',
    onViewStateChange: ({ viewId, viewState }) => {
      if (viewId !== 'main') return;
      main = viewState as MapViewState;
      deck.setProps({ viewState: states(), layers: layers() });
    },
    layers: layers(),
  });

  const stop = ctx.preview
    ? animate((t) => {
        main = { ...main, longitude: wrapLng(10 + Math.sin(t * 0.4) * 25), bearing: 20 + t * 14 };
        deck.setProps({ viewState: states(), layers: layers() });
      })
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
