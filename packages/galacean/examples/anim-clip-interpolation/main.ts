// The same keys under Linear, Step, CubicSpine and Hermite interpolation, one cube each
import { AnimationClip, AnimationFloatCurve, InterpolationType, Transform } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { blinn, add } from '../../shared/gfx-kit.ts';
import { PrimitiveMesh } from '@galacean/engine';

const MODES = ['Linear', 'Step', 'CubicSpine', 'Hermite'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, cube, say } = await cubeStage(el, ctx, { camera: [0, 2.5, 9], size: 0.9 });
  const holder = root.createChild('holder');
  cube.destroy();
  const clip = new AnimationClip('bounce');
  MODES.forEach((mode, i) => {
    add(holder, PrimitiveMesh.createCuboid(engine, 0.9, 0.9, 0.9), blinn(engine, [0.9 - i * 0.2, 0.5 + i * 0.1, 0.3 + i * 0.2]), [(i - 1.5) * 2.2, 0, 0], mode);
    const curve = new AnimationFloatCurve();
    keys(curve, [[0, 0], [1, 2], [2, 0.5], [3, 2], [4, 0]]);
    curve.interpolation = InterpolationType[mode];
    if (mode === 'Hermite') curve.keys.forEach((k, n) => ((k.inTangent = n % 2 ? 0 : -3), (k.outTangent = n % 2 ? 0 : 3)));
    clip.addCurveBinding(mode, Transform, 'position.y', curve);
  });
  playClip(engine, holder, clip);
  say(MODES.map((m) => `${m}`).join('   |   '));
  return stage.dispose;
};

export default mount;
