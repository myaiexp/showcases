// AmbientLight.diffuseIntensity and specularIntensity (default 1)
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { pbrGrid } from '../../shared/gfx-light.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 7], target: [0, 0, 0], light: false });
  const say = caption(stage);
  const ambient = await loadStudioEnv(engine);
  stage.scene.ambientLight = ambient;
  pbrGrid(root, engine, 5, 3);
  const apply = (d: number, s: number): void => {
    ambient.diffuseIntensity = d;
    ambient.specularIntensity = s;
    say(`diffuseIntensity ${d.toFixed(2)}  specularIntensity ${s.toFixed(2)}`);
  };
  if (stage.preview) tick(camera.entity, (_dt, t) => apply(1 + 0.9 * Math.sin(t * 0.8), 1 + 0.9 * Math.sin(t * 0.8 + 2.4)));
  else {
    let d = 1;
    let s = 1;
    apply(d, s);
    slider(stage.bar, 'diffuseIntensity', 0, 3, 0.05, d, (v) => apply((d = v), s));
    slider(stage.bar, 'specularIntensity', 0, 3, 0.05, s, (v) => apply(d, (s = v)));
  }
  return stage.dispose;
};

export default mount;
