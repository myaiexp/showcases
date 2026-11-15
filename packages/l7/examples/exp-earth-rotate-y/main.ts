// Earth map rotateY with force and reg, called every frame
import { EarthLayer, Scene } from '@antv/l7';
import { Earth } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
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

  // rotateY lives on the map service (scene.getMapService()), and takes { force, reg } directly: the docs wrap them in { option }, which L7 then ignores.
  const earth = scene.getMapService() as unknown as { rotateY: (o: { force: boolean; reg: number }) => void };
  let force = true;
  let reg = 0.05;
  stage.frame(() => earth.rotateY({ force, reg }));
  if (stage.bar) {
    slider(stage.bar, 'reg', [0, 0.3, 0.01], 0.05, (v) => (reg = v));
    toggle(stage.bar, 'force (ignore dragging)', true, (v) => (force = v));
  }

  return () => stage.dispose();
};

export default mount;
