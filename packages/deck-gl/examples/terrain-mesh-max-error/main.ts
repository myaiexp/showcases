// TerrainLayer meshMaxError: fewer triangles for a larger tolerance; wireframe shows the mesh
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TerrainLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { heightImage, MAPBOX_DECODER, surfaceImage, TERRAIN_BOUNDS, TERRAIN_CENTER } from '../../shared/geo-layers-art.ts';
import { terrainLoadOptions } from '../../shared/geo-layers-terrain.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: TERRAIN_CENTER[0] - 0.03, latitude: TERRAIN_CENTER[1] - 0.03, zoom: ctx.preview ? 8.4 : 9.4, pitch: 60, bearing: 20 };
  const elevationData = heightImage(256, MAPBOX_DECODER);
  const texture = surfaceImage(256);

  const terrain = (meshMaxError: number, wireframe: boolean): TerrainLayer =>
    new TerrainLayer({
      id: 'terrain',
      elevationData,
      texture: wireframe ? null : texture,
      elevationDecoder: MAPBOX_DECODER,
      bounds: TERRAIN_BOUNDS,
      // Martini error tolerance in metres: a smaller number gives a more detailed mesh.
      meshMaxError,
      wireframe,
      color: [120, 220, 255],
      loadOptions: terrainLoadOptions,
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [terrain(ctx.preview ? 40 : 20, true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Card: sweep the tolerance from coarse to fine.
    let i = 0;
    const steps = [120, 60, 30, 12, 5];
    const timer = setInterval(() => deck.setProps({ layers: [terrain(steps[++i % steps.length]!, true)] }), 1800);
    stop = () => clearInterval(timer);
  } else {
    let [error, wireframe] = [20, true];
    const refresh = (): void => deck.setProps({ layers: [terrain(error, wireframe)] });
    const bar = controlBar(el);
    slider(bar, 'meshMaxError (m)', 1, 150, 1, error, (v) => ((error = v), refresh()));
    check(bar, 'wireframe', wireframe, (v) => ((wireframe = v), refresh()));
  }
  const spin = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, bearing: 20 + t * 8 } })) : () => {};
  return () => {
    stop();
    spin();
    stage.release(deck);
  };
};

export default mount;
