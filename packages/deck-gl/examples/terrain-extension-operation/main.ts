// TerrainExtension: a TerrainLayer with operation 'terrain' or 'terrain+draw' under a graticule
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TerrainLayer } from '@deck.gl/geo-layers';
import { PathLayer } from '@deck.gl/layers';
import { _TerrainExtension as TerrainExtension, type TerrainExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import type { LngLat } from '../../shared/data.ts';
import { heightImage, MAPBOX_DECODER, surfaceImage, TERRAIN_BOUNDS, TERRAIN_CENTER } from '../../shared/geo-layers-art.ts';
import { terrainLoadOptions } from '../../shared/geo-layers-terrain.ts';
import { graticule } from '../../shared/extensions-terrain.ts';
import { animate, createStage } from '../../shared/stage.ts';

const OPERATIONS = ['terrain+draw', 'terrain'] as const;
type Operation = (typeof OPERATIONS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: TERRAIN_CENTER[0] - 0.02, latitude: TERRAIN_CENTER[1] - 0.12, zoom: ctx.preview ? 8.6 : 9.6, pitch: 60, bearing: -20 };
  const elevationData = heightImage(256, MAPBOX_DECODER);
  const texture = surfaceImage(512);
  const lines = graticule();
  let operation: Operation = 'terrain+draw';

  const layers = () => [
    new TerrainLayer({
      id: 'terrain',
      elevationData,
      texture,
      elevationDecoder: MAPBOX_DECODER,
      bounds: TERRAIN_BOUNDS,
      meshMaxError: 8,
      loadOptions: terrainLoadOptions,
      // 'terrain+draw': the surface is drawn and other layers follow it.
      // 'terrain': it only supplies the height; with nothing else drawn, only the grid shows.
      operation,
    }),
    new PathLayer<LngLat[], TerrainExtensionProps>({
      id: 'graticule',
      data: lines,
      getPath: (d) => d,
      getColor: [255, 255, 255, 200],
      getWidth: 1.5,
      widthUnits: 'pixels',
      terrainDrawMode: 'drape',
      extensions: [new TerrainExtension()],
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      operation = OPERATIONS[Math.floor(t / 3) % 2]!;
      deck.setProps({ viewState: { ...view, bearing: -20 + t * 6 }, layers: layers() });
    });
  } else {
    select(controlBar(el), 'TerrainLayer operation', OPERATIONS, (v) => {
      operation = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
