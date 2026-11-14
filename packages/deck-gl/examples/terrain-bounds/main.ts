// TerrainLayer bounds: [left, bottom, right, top] places and scales the image on the map
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TerrainLayer } from '@deck.gl/geo-layers';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { heightImage, MAPBOX_DECODER, surfaceImage, TERRAIN_BOUNDS, TERRAIN_CENTER } from '../../shared/geo-layers-art.ts';
import { terrainLoadOptions } from '../../shared/geo-layers-terrain.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Bounds = [number, number, number, number];

/** The default bounds scaled about their centre. */
function scaled(k: number): Bounds {
  const [w, s, e, n] = TERRAIN_BOUNDS;
  const [cx, cy] = [(w + e) / 2, (s + n) / 2];
  return [cx + (w - cx) * k, cy + (s - cy) * k, cx + (e - cx) * k, cy + (n - cy) * k];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: TERRAIN_CENTER[0], latitude: TERRAIN_CENTER[1] - 0.05, zoom: ctx.preview ? 8 : 8.8, pitch: 55, bearing: 20 };
  const elevationData = heightImage(256, MAPBOX_DECODER);
  const texture = surfaceImage(256);

  const layers = (k: number): [TerrainLayer, PolygonLayer<Bounds>] => {
    const bounds = scaled(k);
    return [
      new TerrainLayer({
        id: 'terrain',
        elevationData,
        texture,
        elevationDecoder: MAPBOX_DECODER,
        // The image's corners: west, south, east, north.
        bounds,
        meshMaxError: 10,
        loadOptions: terrainLoadOptions,
      }),
      // The box itself, drawn as an outline at ground level.
      new PolygonLayer<Bounds>({
        id: 'box',
        data: [bounds],
        getPolygon: (d) => [[d[0], d[1]], [d[2], d[1]], [d[2], d[3]], [d[0], d[3]]],
        filled: false,
        stroked: true,
        getLineColor: [255, 190, 70],
        lineWidthMinPixels: 2,
      }),
    ];
  };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(1) });

  let stop: () => void = () => {};
  let timer = 0;
  if (ctx.preview) {
    // Card: step through three sizes (each step reloads the mesh, so not every frame).
    let i = 0;
    const scales = [1, 0.6, 1.5];
    timer = window.setInterval(() => deck.setProps({ layers: layers(scales[++i % 3]!) }), 2500);
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: 20 + t * 5 } }));
  } else {
    slider(controlBar(el), 'bounds scale', 0.4, 2, 0.1, 1, (k) => deck.setProps({ layers: layers(k) }));
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
