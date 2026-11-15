// PostProcess.isGlobal = false: a volume that only applies near its collider
import { BloomEffect, BoxColliderShape, PostProcess, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root, camera } = await postDemo(el, ctx, { physics: true, camera: [0, 1.4, 14], hint: 'Camera z from 16 to 1; the volume is a 7 x 5 x 6 box with blendDistance 6.' });
  const say = caption(stage);
  const volume = root.createChild('volume');
  const post = volume.addComponent(PostProcess);
  post.isGlobal = false;
  post.blendDistance = 6;
  const collider = volume.addComponent(StaticCollider);
  const box = new BoxColliderShape();
  box.size = new Vector3(7, 5, 6);
  collider.addShape(box);
  const bloom = post.addEffect(BloomEffect);
  bloom.threshold.value = 0.4;
  bloom.intensity.value = 3;
  const look = new Vector3(0, 0.4, 0);
  let z = 14;
  tick(root, (_dt, t) => {
    if (stage.preview) z = 8.5 + 7.5 * Math.sin(t * 0.6);
    camera.entity.transform.setPosition(0, 1.4, z);
    camera.entity.transform.lookAt(look);
    const blended = stage.scene.postProcessManager.getBlendEffect(BloomEffect);
    say(`camera z ${z.toFixed(1)}   blended bloom intensity ${(blended?.intensity.value ?? 0).toFixed(2)}`);
  });
  if (!stage.preview) slider(stage.bar, 'camera z', 1, 16, 0.1, z, (v) => (z = v));
  return stage.dispose;
};

export default mount;
