// Zoom bands: overlapping opacity ramps per GridLayer, set from the zoom in onViewStateChange
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GridLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import type { LngLat } from '../../shared/data.ts';
import { interpolateZoom, PARIS, parisPoints, type ZoomStops } from '../../shared/zoom-dependent-points.ts';

const BANDS: { cellSize: number; opacity: ZoomStops }[] = [
  { cellSize: 8000, opacity: [[0, 1], [9.5, 1], [10.5, 0]] },
  { cellSize: 2000, opacity: [[9.5, 0], [10.5, 1], [11.5, 1], [12.5, 0]] },
  { cellSize: 500, opacity: [[11.5, 0], [12.5, 1], [13.5, 1], [14.5, 0]] },
];
const POINT_STOPS: ZoomStops = [[13.5, 0], [14.5, 1]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#141c27' });
  const view: MapViewState = { longitude: PARIS[0], latitude: PARIS[1], zoom: ctx.preview ? 9.2 : 10, minZoom: 7, maxZoom: 16 };
  // One data object, shared by every band, so each band aggregates once.
  const data = parisPoints(ctx.preview ? 3000 : 20_000, 6);
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);

  const getLayers = (zoom: number) => {
    const grids = BANDS.map(({ cellSize, opacity: stops }) => {
      const opacity = interpolateZoom(zoom, stops);
      return new GridLayer<LngLat>({
        id: `grid-${cellSize}`,
        data,
        getPosition: (d) => d,
        cellSize,
        gpuAggregation: false,
        opacity,
        // A band at opacity 0 is skipped, but keeps its aggregation for when it fades back in.
        visible: opacity > 0,
        colorRange: [[40, 70, 130], [70, 130, 200], [110, 200, 230], [255, 210, 90], [255, 120, 60]],
      });
    });
    const pointOpacity = interpolateZoom(zoom, POINT_STOPS);
    const points = new ScatterplotLayer<LngLat>({ id: 'points', data, getPosition: (d) => d, radiusUnits: 'pixels', getRadius: 2.5, getFillColor: [255, 230, 160], opacity: pointOpacity, visible: pointOpacity > 0 });
    return [...grids, points];
  };
  const describe = (zoom: number): string =>
    `zoom ${zoom.toFixed(2)}  opacity ${BANDS.map((b) => `${b.cellSize}m ${interpolateZoom(zoom, b.opacity).toFixed(2)}`).join('  ')}  points ${interpolateZoom(zoom, POINT_STOPS).toFixed(2)}`;

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    onViewStateChange: ({ viewState }) => {
      deck.setProps({ layers: getLayers(viewState.zoom) });
      label.textContent = describe(viewState.zoom);
    },
    layers: getLayers(view.zoom),
  });
  label.textContent = describe(view.zoom);

  let timer = 0;
  if (ctx.preview) {
    let up = true;
    timer = window.setInterval(() => {
      up = !up;
      deck.setProps({ initialViewState: { ...view, zoom: up ? 13.2 : 9.2, transitionDuration: 3000 } });
    }, 3200);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
