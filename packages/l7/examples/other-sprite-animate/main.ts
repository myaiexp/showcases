// GeometryLayer sprite: spriteAnimate 'down' or 'up'
import { GeometryLayer, type ILayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { snowflake, spark } from '../../shared/exp-textures.ts';
import { cycle, orbit } from '../../shared/polygon-data.ts';
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

  const make = (dir: 'down' | 'up'): ILayer =>
    new GeometryLayer().shape('sprite').size(10).style({
      opacity: 0.9,
      center: [13.4, 52.5],
      spriteCount: 160,
      spriteRadius: 0.2,
      spriteTop: 0.5,
      spriteUpdate: 0.005,
      spriteScale: 0.35,
      spriteAnimate: dir,
      mapTexture: dir === 'down' ? snowflake() : spark(),
    });
  let layer = make('down');
  scene.addLayer(layer);

  const set = (dir: 'down' | 'up'): void => {
    scene.removeLayer(layer);
    layer = make(dir);
    scene.addLayer(layer);
  };
  if (stage.bar) select(stage.bar, 'spriteAnimate', ['down', 'up'] as const, 'down', set);
  else {
    cycle(stage, scene, ['down', 'up'] as const, 2500, set);
    orbit(stage, scene, { pitch: 60, turn: 15 });
  }

  return () => stage.dispose();
};

export default mount;
