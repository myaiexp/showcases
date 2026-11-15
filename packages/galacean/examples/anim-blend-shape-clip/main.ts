// An AnimationFloatArrayCurve on blendShapeWeights, built in code
import { AnimationClip, AnimationFloatArrayCurve, SkinnedMeshRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { keys, playClip } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { blobGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, blobGlb, { camera: [0, 1.5, 5], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, engine, model, say } = r;
  model.transform.setPosition(0, 1.2, 0);
  const skinned = model.getComponentsIncludeChildren(SkinnedMeshRenderer, [])[0]!;
  // Our own clip instead of the file's: weights [Cube, Spikes] over time.
  const clip = new AnimationClip('wobble');
  const curve = new AnimationFloatArrayCurve();
  keys(curve, [[0, new Float32Array([0, 0])], [1, new Float32Array([1, 0])], [2, new Float32Array([0.4, 1])], [3, new Float32Array([0, 0.3])], [4, new Float32Array([0, 0])]]);
  // The renderer sits on the root entity of this single-node model.
  clip.addCurveBinding(skinned.entity === model ? '' : skinned.entity.name, SkinnedMeshRenderer, 'blendShapeWeights', curve);
  playClip(engine, model, clip);
  tick(model, (dt) => {
    model.transform.rotate(0, 20 * dt, 0);
    say(`blendShapeWeights [${Array.from(skinned.blendShapeWeights, (w) => w.toFixed(2)).join(', ')}]`);
  });
  return stage.dispose;
};

export default mount;
