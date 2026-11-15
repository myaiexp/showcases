// entityPath reaches children and grandchildren: one clip moves a parent, a child and a grandchild
import { AnimationClip, AnimationFloatCurve, AnimationVector3Curve, PrimitiveMesh, Transform, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, cube, say } = await cubeStage(el, ctx, { camera: [0, 2.2, 8], size: 1 });
  cube.destroy();
  const holder = root.createChild('arm');
  const mesh = (parent: typeof holder, name: string, rgb: [number, number, number], r: number, at: [number, number, number]) =>
    add(parent, PrimitiveMesh.createSphere(engine, r, 24), blinn(engine, rgb), at, name).entity;
  const a = mesh(holder, 'a', [0.9, 0.4, 0.3], 0.5, [0, 0.5, 0]);
  const b = mesh(a, 'b', [0.4, 0.8, 0.4], 0.35, [1.6, 0, 0]);
  mesh(b, 'c', [0.4, 0.5, 0.95], 0.25, [1.2, 0, 0]);
  const clip = new AnimationClip('wave');
  const turn = (path: string, deg: number, offset: number): void => {
    const c = new AnimationFloatCurve();
    keys(c, [[0, -deg], [1.5 + offset, deg], [3, -deg]]);
    clip.addCurveBinding(path, Transform, 'rotation.z', c);
  };
  turn('a', 25, 0);
  turn('a/b', 40, 0.2);
  turn('a/b/c', 55, 0.4);
  const lift = new AnimationVector3Curve();
  keys(lift, [[0, new Vector3(-1.2, 0, 0)], [1.5, new Vector3(-1.2, 0.5, 0)], [3, new Vector3(-1.2, 0, 0)]]);
  clip.addCurveBinding('', Transform, 'position', lift);
  playClip(engine, holder, clip);
  say('entity paths: "", "a", "a/b", "a/b/c"');
  return stage.dispose;
};

export default mount;
