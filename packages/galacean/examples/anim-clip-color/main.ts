// A colour clip on the renderer's "getMaterial().baseColor": red, green, blue
import { AnimationClip, AnimationColorCurve, Color, MeshRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { lin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, say } = await cubeStage(el, ctx, { size: 1.5 });
  const c = (rgb: [number, number, number]): Color => new Color(...lin(rgb), 1);
  const clip = new AnimationClip('material');
  const curve = new AnimationColorCurve();
  // As in the material-animation guide: red, green at 0:20, blue at 0:40, red again at 1:00 (60 fps frames).
  keys(curve, [[0, c([1, 0.1, 0.1])], [1 / 3, c([0.1, 1, 0.1])], [2 / 3, c([0.15, 0.2, 1])], [1, c([1, 0.1, 0.1])]]);
  clip.addCurveBinding('', MeshRenderer, 'getMaterial().baseColor', curve);
  playClip(engine, cube, clip);
  say('addCurveBinding("", MeshRenderer, "getMaterial().baseColor", AnimationColorCurve)');
  return stage.dispose;
};

export default mount;
