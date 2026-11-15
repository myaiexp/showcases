// EarthLayer shape('bloomSphere'): glow around the globe
import { EarthLayer, Scene } from '@antv/l7';
import { Earth } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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
  const bloom = new EarthLayer().color('#ffffff').shape('bloomSphere').style({ opacity: 0.5 });
  scene.addLayer(earthLayer);
  scene.addLayer(atmosphere);
  scene.addLayer(bloom);

  const earth = scene.getMapService() as unknown as { rotateY: (o: { force: boolean; reg: number }) => void };
  stage.frame(() => earth.rotateY({ force: true, reg: 0.04 }));
  if (stage.bar) slider(stage.bar, 'bloom opacity', [0, 1, 0.05], 0.5, (opacity) => { bloom.style({ opacity }); scene.render(); });

  return () => stage.dispose();
};

export default mount;
