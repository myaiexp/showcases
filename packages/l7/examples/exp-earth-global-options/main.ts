// EarthLayer globalOptions: ambient, diffuse, specular and earthTime
import { EarthLayer, Scene } from '@antv/l7';
import { Earth } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { globeTexture } from '../../shared/exp-textures.ts';
import { cycle } from '../../shared/polygon-data.ts';
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

  const globalOptions = { ambientRatio: 0.6, diffuseRatio: 0.4, specularRatio: 0.1, earthTime: 0.1 };
  const set = (patch: Partial<typeof globalOptions>): void => {
    Object.assign(globalOptions, patch);
    earthLayer.style({ globalOptions: { ...globalOptions } });
    scene.render();
  };
  const earth = scene.getMapService() as unknown as { rotateY: (o: { force: boolean; reg: number }) => void };
  stage.frame(() => earth.rotateY({ force: true, reg: 0.04 }));
  if (stage.bar) {
    slider(stage.bar, 'ambientRatio', [0, 1, 0.05], 0.6, (ambientRatio) => set({ ambientRatio }));
    slider(stage.bar, 'diffuseRatio', [0, 1, 0.05], 0.4, (diffuseRatio) => set({ diffuseRatio }));
    slider(stage.bar, 'specularRatio', [0, 1, 0.05], 0.1, (specularRatio) => set({ specularRatio }));
    slider(stage.bar, 'earthTime', [0, 1, 0.02], 0.1, (earthTime) => set({ earthTime }));
  } else cycle(stage, scene, [0.1, 0.5, 0.9, 0.3] as const, 1500, (earthTime) => set({ earthTime }));

  return () => stage.dispose();
};

export default mount;
