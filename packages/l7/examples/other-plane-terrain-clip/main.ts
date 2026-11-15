// GeometryLayer terrain: terrainClipHeight cuts away low ground
import { GeometryLayer, type ILayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { heightMap, terrainColors } from '../../shared/exp-textures.ts';
import { cycle, orbit } from '../../shared/polygon-data.ts';
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

  const make = (terrainClipHeight: number): ILayer =>
    new GeometryLayer().shape('plane').style({
      width: 0.074,
      height: 0.061,
      center: [13.4, 52.5],
      widthSegments: ctx.preview ? 60 : 120,
      heightSegments: ctx.preview ? 60 : 120,
      mapTexture: terrainColors(256),
      terrainTexture: heightMap(128),
      rgb2height: (r: number) => r * 0.3,
      terrainClipHeight,
    });
  // terrainClipHeight is read when the model builds, so each value is a new layer.
  let layer = make(1);
  scene.addLayer(layer);

  const set = (v: number): void => {
    scene.removeLayer(layer);
    layer = make(v);
    scene.addLayer(layer);
  };
  if (stage.bar) slider(stage.bar, 'terrainClipHeight', [0, 80, 2], 1, set);
  else {
    cycle(stage, scene, [1, 30, 60, 10], 1800, set);
    orbit(stage, scene, { pitch: 55, turn: 20 });
  }

  return () => stage.dispose();
};

export default mount;
