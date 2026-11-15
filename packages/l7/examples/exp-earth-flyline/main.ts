// LineLayer arc3d fly lines on an Earth map
import { EarthLayer, LineLayer, Scene } from '@antv/l7';
import { Earth } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { globeTexture } from '../../shared/exp-textures.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
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
    .shape('base')
    .style({ radius: 40, globalOptions: { ambientRatio: 0.7, diffuseRatio: 0.3, specularRatio: 0.05, earthTime: 0.3 } });
  scene.addLayer(earthLayer);
  scene.addLayer(
    new LineLayer()
      .source(rows('London', 18), PARSER)
      .shape('arc3d')
      .size(1.5)
      .color('#ffd166')
      .style({ opacity: 0.9 })
      .animate({ enable: true, interval: 0.6, trailLength: 1.2, duration: 2.5 }),
  );

  const earth = scene.getMapService() as unknown as { rotateY: (o: { force: boolean; reg: number }) => void };
  stage.frame(() => earth.rotateY({ force: true, reg: 0.04 }));

  return () => stage.dispose();
};

export default mount;
