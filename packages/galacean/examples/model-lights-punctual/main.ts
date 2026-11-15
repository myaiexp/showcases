// KHR_lights_punctual: a point light declared in the glTF becomes a PointLight entity
import { Animator, PointLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';
import { lightsGlb } from '../../shared/model-gltf.ts';

const mount: Mount = async (el, ctx) => {
  // No sun and no environment: the only light in the scene comes from the glTF.
  const r = await rig(el, ctx, lightsGlb, { light: false, env: false, camera: [0, 2, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, gltf, model } = r;
  stage.scene.ambientLight.diffuseSolidColor.set(0.02, 0.02, 0.03, 1);
  model.getComponent(Animator)!.play('Orbit');
  const light = gltf.lights![0] as PointLight;
  panel(stage).text(`glTF.lights: ${gltf.lights!.length}\n${light instanceof PointLight ? 'PointLight' : 'other light'} on "${light.entity.name}"\ndistance ${light.distance}`);
  return stage.dispose;
};

export default mount;
