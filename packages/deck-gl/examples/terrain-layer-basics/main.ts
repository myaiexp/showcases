// TerrainLayer: a mesh from a height-map image (drawn in code), textured and placed by bounds
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TerrainLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { heightImage, MAPBOX_DECODER, surfaceImage, TERRAIN_BOUNDS, TERRAIN_CENTER } from '../../shared/geo-layers-art.ts';
import { terrainLoadOptions } from '../../shared/geo-layers-terrain.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: TERRAIN_CENTER[0] - 0.03, latitude: TERRAIN_CENTER[1] - 0.03, zoom: ctx.preview ? 8.4 : 9.4, pitch: 62, bearing: 20 };

  // PNG data URLs: a URL without {x}/{y} is one mesh; nothing is fetched from a server.
  const elevationData = heightImage(256, MAPBOX_DECODER);
  const texture = surfaceImage(512);

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      new TerrainLayer({
        id: 'terrain',
        elevationData,
        texture,
        // Mapbox's terrain encoding: height = -10000 + (R * 256 * 256 + G * 256 + B) * 0.1
        elevationDecoder: MAPBOX_DECODER,
        // [left, bottom, right, top] of the image, in longitude and latitude.
        bounds: TERRAIN_BOUNDS,
        meshMaxError: 8,
        loadOptions: terrainLoadOptions,
      }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, bearing: 20 + t * 8 } })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
