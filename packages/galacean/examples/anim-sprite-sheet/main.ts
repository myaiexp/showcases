// Frame animation: an AnimationRefCurve swaps SpriteRenderer.sprite between three cuts of one sheet
import { AnimationClip, AnimationRefCurve, SpriteRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { keys, playClip } from '../../shared/anim-kit.ts';
import { scene2d, spriteFrom, textureOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  // A 3-frame sheet in one row: each frame is a face with a different mouth.
  const sheet = textureOf(engine, 384, 128, (g, w, h) => {
    for (let i = 0; i < 3; i++) {
      const cx = i * (w / 3) + 64;
      g.fillStyle = ['#f5c542', '#f59e42', '#f5d742'][i]!;
      g.beginPath();
      g.arc(cx, h / 2, 52, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#222';
      g.beginPath();
      g.arc(cx - 18, h / 2 - 14, 6, 0, 7);
      g.arc(cx + 18, h / 2 - 14, 6, 0, 7);
      g.fill();
      g.strokeStyle = '#222';
      g.lineWidth = 5;
      g.beginPath();
      if (i === 0) g.arc(cx, h / 2 + 10, 20, 0.1, Math.PI - 0.1);
      else if (i === 1) g.ellipse(cx, h / 2 + 22, 14, 14, 0, 0, 7);
      else g.moveTo(cx - 20, h / 2 + 24), g.lineTo(cx + 20, h / 2 + 24);
      g.stroke();
    }
  });
  // Region (x, y, width, height) is a share of the texture: width 1/3 for each of the three frames.
  const frames = [0, 1, 2].map((i) => spriteFrom(engine, sheet, { region: [i / 3, 0, 1 / 3, 1] }));
  const entity = root.createChild('face');
  const renderer = entity.addComponent(SpriteRenderer);
  renderer.sprite = frames[0]!;
  renderer.width = 3;
  renderer.height = 3;
  const clip = new AnimationClip('talk');
  const curve = new AnimationRefCurve();
  keys(curve, [[0, frames[0]!], [0.2, frames[1]!], [0.4, frames[2]!], [0.6, frames[0]!]]);
  clip.addCurveBinding('', SpriteRenderer, 'sprite', curve);
  playClip(engine, entity, clip);
  return stage.dispose;
};

export default mount;
