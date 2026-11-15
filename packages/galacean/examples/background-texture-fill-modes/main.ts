// background.texture with textureFillMode: AspectFitWidth, AspectFitHeight or Fill
import { BackgroundMode, BackgroundTextureFillMode, PrimitiveMesh, Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { paint } from '../../shared/textures.ts';

const MODES = ['AspectFitWidth', 'AspectFitHeight', 'Fill'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0.5, 6], height: 420 });
  const say = caption(stage);
  const canvas = paint(512, (g, s) => {
    g.save();
    g.scale(2, 1);
    const grad = g.createLinearGradient(0, 0, s / 2, s);
    grad.addColorStop(0, '#2f4a8a');
    grad.addColorStop(1, '#d9774b');
    g.fillStyle = grad;
    g.fillRect(0, 0, s / 2, s);
    g.restore();
    g.strokeStyle = 'rgba(255,255,255,0.55)';
    g.lineWidth = 6;
    g.strokeRect(10, 10, s - 20, s - 20);
    g.beginPath();
    g.arc(s / 2, s / 2, s * 0.33, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#fff';
    g.font = 'bold 56px sans-serif';
    g.textAlign = 'center';
    g.fillText('BACKGROUND', s / 2, s / 2 + 18);
  });
  const texture = new Texture2D(engine, 512, 512);
  texture.setImageSource(canvas);
  stage.own(() => texture.destroy());
  const { background } = stage.scene;
  background.mode = BackgroundMode.Texture;
  background.texture = texture;
  spin(add(root, PrimitiveMesh.createSphere(engine, 0.8), pbr(engine, [0.95, 0.95, 0.9], 0.2, 0.3)).entity, [0, 30, 0]);
  const apply = (m: (typeof MODES)[number]): void => {
    background.textureFillMode = BackgroundTextureFillMode[m];
    say(`textureFillMode = ${m}`);
  };
  if (stage.preview) steps(camera.entity, 2.2, MODES.length, (i) => apply(MODES[i]!));
  else {
    apply('AspectFitHeight');
    select(stage.bar, 'textureFillMode', MODES, apply, 'AspectFitHeight');
  }
  return stage.dispose;
};

export default mount;
