// Hermite keys take inTangent and outTangent: the slopes shape the curve between the same values
import { AnimationClip, AnimationFloatCurve, InterpolationType, PrimitiveMesh, Transform } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { add, blinn, steps } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, cube, say } = await cubeStage(el, ctx, { size: 0.9 });
  cube.destroy();
  const holder = root.createChild('holder');
  add(holder, PrimitiveMesh.createSphere(engine, 0.5, 24), blinn(engine, [0.95, 0.6, 0.25]), [0, 0, 0], 'ball');
  const clip = new AnimationClip('ease');
  const curve = new AnimationFloatCurve();
  keys(curve, [[0, -3], [2, 3], [4, -3]]);
  curve.interpolation = InterpolationType.Hermite;
  const tangent = (slope: number): void => {
    curve.keys.forEach((k) => ((k.inTangent = slope), (k.outTangent = slope)));
    say(`Hermite, in/out tangent ${slope.toFixed(1)}: ${slope === 0 ? 'eases in and out' : slope > 0 ? 'overshoots' : 'dips back first'}`);
  };
  clip.addCurveBinding('ball', Transform, 'position.x', curve);
  playClip(engine, holder, clip);
  if (stage.preview) {
    steps(root, 4, 3, (i) => tangent([0, 4, -4][i]!));
  } else {
    tangent(0);
    slider(stage.bar, 'tangent', -6, 6, 0.1, 0, tangent);
  }
  return stage.dispose;
};

export default mount;
