// Earth map and an EarthLayer base sphere with a texture drawn in code
import { EarthLayer, Scene } from '@antv/l7';
import { Earth } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
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
  scene.addLayer(earthLayer);

  // Cards have no pointer: turn the globe by hand (rotateY is the Earth map's own method).
  if (ctx.preview) stage.frame(() => (scene.getMapService() as unknown as { rotateY: (o: { force: boolean; reg: number }) => void }).rotateY({ force: true, reg: 0.05 }));

  return () => stage.dispose();
};

export default mount;
