// Each instantiateSceneRoot() copy has its own Animator and clip
import type { Mount } from '@/types.ts';
import { Animator } from '@galacean/engine';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const CLIPS = ['Idle', 'Walk', 'Run', 'Wave', 'Jump'];

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { bare: true, camera: [0, 1.8, 8.5], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, root, gltf, say } = r;
  const copies = CLIPS.map((name, i) => {
    const copy = gltf.instantiateSceneRoot();
    copy.transform.setPosition((i - 2) * 1.9, 0, 0);
    root.addChild(copy);
    // Each copy owns its Animator: play a different state on each, starting at a different time.
    copy.getComponent(Animator)!.play(name, 0, i / CLIPS.length);
    return copy;
  });
  say('five instantiateSceneRoot() copies, five Animators');
  tick(root, (_dt, t) => copies.forEach((c, i) => c.transform.setRotation(0, Math.sin(t * 0.7 + i) * 25, 0)));
  if (!stage.preview) stage.bar.append('Idle, Walk, Run, Wave, Jump: one clip per copy');
  return stage.dispose;
};

export default mount;
