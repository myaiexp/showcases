// GeometryLayer shape('sprite'): falling snow
import { GeometryLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { snowflake } from '../../shared/exp-textures.ts';
import { orbit } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [13.4, 52.5], zoom: ctx.preview ? 9.5 : 10.5, pitch: 60 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new GeometryLayer().shape('sprite').size(10).style({ opacity: 0.8, center: [13.4, 52.5], spriteCount: 120, spriteRadius: 0.2, spriteTop: 0.5, spriteUpdate: 0.004, spriteScale: 0.35, mapTexture: snowflake() });
  scene.addLayer(layer);

  if (ctx.preview) orbit(stage, scene, { pitch: 60, turn: 20 });

  return () => stage.dispose();
};

export default mount;
