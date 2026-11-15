// PostProcess.blendDistance: where a local volume starts to blend in
import { BloomEffect, BoxColliderShape, PostProcess, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root, camera } = await postDemo(el, ctx, { physics: true, camera: [0, 1.4, 9], hint: 'The camera sits 3 units outside the box.' });
  const say = caption(stage);
  camera.entity.transform.lookAt(new Vector3(0, 0.4, 0));
  const volume = root.createChild('volume');
  const post = volume.addComponent(PostProcess);
  post.isGlobal = false;
  const collider = volume.addComponent(StaticCollider);
  const box = new BoxColliderShape();
  box.size = new Vector3(7, 5, 6);
  collider.addShape(box);
  const bloom = post.addEffect(BloomEffect);
  bloom.threshold.value = 0.4;
  bloom.intensity.value = 3;
  let distance = 4;
  tick(root, (_dt, t) => {
    if (stage.preview) distance = 0.5 + 5.5 * (0.5 + 0.5 * Math.sin(t * 0.7));
    post.blendDistance = distance;
    const blended = stage.scene.postProcessManager.getBlendEffect(BloomEffect);
    say(`blendDistance ${distance.toFixed(1)}   blended intensity ${(blended?.intensity.value ?? 0).toFixed(2)}`);
  });
  if (!stage.preview) slider(stage.bar, 'blendDistance', 0, 8, 0.1, distance, (v) => (distance = v));
  return stage.dispose;
};

export default mount;
