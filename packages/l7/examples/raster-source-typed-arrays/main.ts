// RasterLayer source: the same field as different typed arrays
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { CENTER, elevation, EXTENT } from '../../shared/raster-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: CENTER, zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const n = ctx.preview ? 64 : 160;
  const field = elevation(n, n, 250);
  // Each constructor casts the values: Uint8 and Int8 clip at their limits, Float64 keeps them.
  const kinds = {
    Uint8Array: Uint8Array.from(field),
    Int8Array: Int8Array.from(field),
    Uint16Array: Uint16Array.from(field),
    Int16Array: Int16Array.from(field),
    Uint32Array: Uint32Array.from(field),
    Int32Array: Int32Array.from(field),
    Float32Array: Float32Array.from(field),
    Float64Array: Float64Array.from(field),
  };
  type Kind = keyof typeof kinds;
  const parser = { type: 'raster', width: n, height: n, extent: EXTENT } as const;
  const layer = new RasterLayer({})
    .source(kinds.Uint8Array, { parser })
    .style({ domain: [0, 255], rampColors: { type: 'linear', colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 60, 120, 180, 255] } });
  scene.addLayer(layer);

  const set = (k: Kind): void => {
    layer.setData(kinds[k], { parser });
    scene.render();
  };
  const names = Object.keys(kinds) as Kind[];
  if (stage.bar) select(stage.bar, 'array', names, 'Uint8Array', set);
  else cycle(stage, scene, names, 1100, set);

  return () => stage.dispose();
};

export default mount;
