// Global and local volumes blend: mix(global, local, 1 - distance / blendDistance)
import { BloomEffect, BoxColliderShape, PostProcess, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const BLEND = 4;
const HALF_DEPTH = 3;

const mount: Mount = async (el, ctx) => {
  const { stage, root, camera } = await postDemo(el, ctx, { physics: true, camera: [0, 1.4, 12], hint: 'Global intensity 0.5, local intensity 1, blendDistance 4; distance is measured from the box surface.' });
  const say = caption(stage);
  const global = root.createChild('global').addComponent(PostProcess);
  const globalBloom = global.addEffect(BloomEffect);
  globalBloom.threshold.value = 0.4;
  globalBloom.intensity.value = 0.5;
  const volume = root.createChild('local');
  const local = volume.addComponent(PostProcess);
  local.isGlobal = false;
  local.blendDistance = BLEND;
  local.priority = 1;
  const collider = volume.addComponent(StaticCollider);
  const box = new BoxColliderShape();
  box.size = new Vector3(7, 5, HALF_DEPTH * 2);
  collider.addShape(box);
  const localBloom = local.addEffect(BloomEffect);
  localBloom.threshold.value = 0.4;
  localBloom.intensity.value = 1;
  const look = new Vector3(0, 0.4, 0);
  let distance = 6;
  tick(root, (_dt, t) => {
    if (stage.preview) distance = 0.1 + 5.4 * (0.5 + 0.5 * Math.sin(t * 0.6));
    camera.entity.transform.setPosition(0, 1.4, HALF_DEPTH + distance);
    camera.entity.transform.lookAt(look);
    const blended = stage.scene.postProcessManager.getBlendEffect(BloomEffect);
    const expected = 0.5 + 0.5 * Math.min(1, Math.max(0, 1 - distance / BLEND));
    say(`distance ${distance.toFixed(1)}   blended ${(blended?.intensity.value ?? 0).toFixed(2)}   formula ${expected.toFixed(2)}`);
  });
  if (!stage.preview) slider(stage.bar, 'distance to box', 0, 8, 0.1, distance, (v) => (distance = v));
  return stage.dispose;
};

export default mount;
