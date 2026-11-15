// GeometryLayer plane as 3D terrain from a height map drawn in code
import { GeometryLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { heightMap, terrainColors } from '../../shared/exp-textures.ts';
import { orbit } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [13.4, 52.5], zoom: ctx.preview ? 10.8 : 11.5, pitch: 55 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new GeometryLayer().shape('plane').style({
    width: 0.074,
    height: 0.061,
    center: [13.4, 52.5],
    widthSegments: ctx.preview ? 60 : 120,
    heightSegments: ctx.preview ? 60 : 120,
    mapTexture: terrainColors(256),
    terrainTexture: heightMap(128),
    // rgb2height gets the pixel's 0-255 bytes (not 0-1 as the docs' formula assumes); the red byte is the height.
    rgb2height: (r: number) => r * 0.3,
  });
  scene.addLayer(layer);

  if (ctx.preview) orbit(stage, scene, { pitch: 55, turn: 30 });

  return () => stage.dispose();
};

export default mount;
