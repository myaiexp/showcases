// TerrainExtension terrainDrawMode: a trail draped over the surface or lifted
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TerrainLayer } from '@deck.gl/geo-layers';
import { PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import { _TerrainExtension as TerrainExtension, type TerrainExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import type { LngLat } from '../../shared/data.ts';
import { heightImage, MAPBOX_DECODER, surfaceImage, TERRAIN_BOUNDS, TERRAIN_CENTER } from '../../shared/geo-layers-art.ts';
import { terrainLoadOptions } from '../../shared/geo-layers-terrain.ts';
import { trail, waypoints } from '../../shared/extensions-terrain.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Mode = NonNullable<TerrainExtensionProps['terrainDrawMode']>;
const MODES: readonly Mode[] = ['drape', 'offset'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: TERRAIN_CENTER[0] - 0.02, latitude: TERRAIN_CENTER[1] - 0.12, zoom: ctx.preview ? 8.6 : 9.6, pitch: 60, bearing: 15 };
  const elevationData = heightImage(256, MAPBOX_DECODER);
  const texture = surfaceImage(512);
  const path = trail();
  const points = waypoints();
  let terrainDrawMode: Mode = 'drape';

  const layers = () => [
    new TerrainLayer({
      id: 'terrain',
      elevationData,
      texture,
      elevationDecoder: MAPBOX_DECODER,
      bounds: TERRAIN_BOUNDS,
      meshMaxError: 8,
      loadOptions: terrainLoadOptions,
      // The terrain source: drawn, and also the surface other layers are fitted to
      operation: 'terrain+draw',
    }),
    new PathLayer<LngLat[], TerrainExtensionProps>({
      id: 'trail',
      data: [path],
      getPath: (d) => d,
      getColor: [255, 90, 60],
      getWidth: 5,
      widthUnits: 'pixels',
      // drape: painted onto the surface as a texture (altitude ignored).
      // offset: each vertex is lifted by the terrain height under it.
      terrainDrawMode,
      extensions: [new TerrainExtension()],
    }),
    new ScatterplotLayer<LngLat, TerrainExtensionProps>({
      id: 'waypoints',
      data: points,
      getPosition: (d) => d,
      getRadius: 400,
      getFillColor: [255, 255, 255],
      // 'offset' is the automatic choice for point layers: each point sits on the surface
      terrainDrawMode: 'offset',
      extensions: [new TerrainExtension()],
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      terrainDrawMode = MODES[Math.floor(t / 3) % 2]!;
      deck.setProps({ viewState: { ...view, bearing: 15 + t * 6 }, layers: layers() });
    });
  } else {
    select(controlBar(el), 'trail terrainDrawMode', MODES, (v) => {
      terrainDrawMode = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
