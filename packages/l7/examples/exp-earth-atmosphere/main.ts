// EarthLayer shape('atomSphere'): the atmosphere around the globe
import { EarthLayer, Scene } from '@antv/l7';
import { Earth } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { globeTexture } from '../../shared/exp-textures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Earth({}),
  });
  await stage.ready(scene);

  const earthLayer = new EarthLayer()
    .source(globeTexture(), { parser: { type: 'image' } })
    .color('#2E8AE6')
    .shape('base')
    .style({ opacity: 1.0, radius: 40, globalOptions: { ambientRatio: 0.6, diffuseRatio: 0.4, specularRatio: 0.1, earthTime: 0.1 } })
    .animate(true);
  const atmosphere = new EarthLayer().color('#2E8AE6').shape('atomSphere').style({ opacity: 1 });
  scene.addLayer(earthLayer);
  scene.addLayer(atmosphere);

  const earth = scene.getMapService() as unknown as { rotateY: (o: { force: boolean; reg: number }) => void };
  stage.frame(() => earth.rotateY({ force: true, reg: 0.04 }));
  if (stage.bar) {
    slider(stage.bar, 'opacity', [0, 1, 0.05], 1, (opacity) => { atmosphere.style({ opacity }); scene.render(); });
    select(stage.bar, 'color', ['#2E8AE6', '#ff7a59', '#7cff9b', '#c792ea'], '#2E8AE6', (c) => { atmosphere.color(c); scene.render(); });
  }

  return () => stage.dispose();
};

export default mount;
