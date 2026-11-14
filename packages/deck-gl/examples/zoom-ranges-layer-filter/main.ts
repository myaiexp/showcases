// minzoom/maxzoom the deck.gl way: layerFilter per viewport, or the visible prop per layer
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import type { LngLat } from '../../shared/data.ts';
import { PARIS, parisPoints } from '../../shared/zoom-dependent-points.ts';

const POINTS = parisPoints(4000);
const HOODS: LngLat[] = [[2.35, 48.86], [2.25, 48.9], [2.45, 48.82], [2.3, 48.8], [2.4, 48.92]];
/** [minZoom, maxZoom): inclusive minimum, exclusive maximum, as in the style spec. */
const ZOOM_RANGES: Record<string, [number, number]> = { summary: [0, 9], points: [9, 24] };
type Method = 'layerFilter' | 'visible prop';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#141c27' });
  const view: MapViewState = { longitude: PARIS[0], latitude: PARIS[1], zoom: ctx.preview ? 8 : 9, minZoom: 5 };
  let method: Method = 'layerFilter';
  let zoom = view.zoom;
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);

  const inRange = (id: string, z: number): boolean => z >= ZOOM_RANGES[id]![0] && z < ZOOM_RANGES[id]![1];
  const layers = () => [
    new ScatterplotLayer<LngLat>({
      id: 'summary',
      data: HOODS,
      visible: method === 'visible prop' ? inRange('summary', zoom) : true,
      getPosition: (d) => d,
      getRadius: 9000,
      getFillColor: [90, 150, 255, 150],
    }),
    new ScatterplotLayer<LngLat>({
      id: 'points',
      data: POINTS,
      visible: method === 'visible prop' ? inRange('points', zoom) : true,
      getPosition: (d) => d,
      getRadius: 3,
      radiusUnits: 'pixels',
      getFillColor: [255, 170, 70, 200],
    }),
  ];
  const describe = (): string => {
    const on = Object.keys(ZOOM_RANGES).filter((id) => inRange(id, zoom));
    return `zoom ${zoom.toFixed(2)}   drawn: ${on.join(', ')}   (${method})`;
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    // Called per viewport for every layer; composite layers are filtered by id as well.
    layerFilter: ({ layer, viewport }) => {
      if (method !== 'layerFilter') return true;
      const range = ZOOM_RANGES[layer.id];
      return !range || (viewport.zoom >= range[0] && viewport.zoom < range[1]);
    },
    onViewStateChange: ({ viewState }) => {
      zoom = viewState.zoom;
      label.textContent = describe();
      if (method === 'visible prop') deck.setProps({ layers: layers() });
    },
    layers: layers(),
  });
  label.textContent = describe();

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      zoom = zoom < 9 ? 10 : 8;
      deck.setProps({ initialViewState: { ...view, zoom, transitionDuration: 1500 } });
    }, 3000);
  } else {
    select(controlBar(el), 'apply the range with', ['layerFilter', 'visible prop'] as Method[], (v) => {
      method = v;
      deck.setProps({ layers: layers() });
      label.textContent = describe();
    }, method);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
