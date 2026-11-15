// Growing texture sizes: the look barely changes, memory grows fourfold
import { PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lit, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';
import { canvasTexture } from '../../shared/textures.ts';

const draw = (g: CanvasRenderingContext2D, size: number): void => {
  const grad = g.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#3b82f6');
  grad.addColorStop(1, '#f59e0b');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  g.fillStyle = 'rgba(255,255,255,.9)';
  g.beginPath();
  g.arc(size / 2, size / 2, size * 0.28, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#16202e';
  g.font = `bold ${size * 0.2}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('Aa', size / 2, size / 2);
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'On screen the quad is about 300 pixels wide, so anything above that is wasted memory.' });
  const { engine, root } = stage;
  lit(stage, [0, 0, 5.5]);
  const info = panel(stage, 'bl');
  const sizes = stage.preview ? [64, 256, 1024] : [64, 128, 256, 512, 1024, 2048];
  const material = new UnlitMaterial(engine);
  const quad = solid(root, PrimitiveMesh.createPlane(engine, 3.4, 3.4), material);
  quad.transform.setRotation(90, 0, 0);
  let size = 0;
  const use = (s: number): void => {
    if (s === size) return;
    size = s;
    const old = material.baseTexture;
    material.baseTexture = canvasTexture(engine, draw, { size: s });
    old?.destroy(true);
  };
  use(sizes[0]!);
  let auto = true;
  const choice = stage.preview ? undefined : select(stage.bar, 'texture size', sizes.map(String), (v) => ((auto = false), use(Number(v))));
  tick(root, (_dt, t) => {
    if (auto) {
      use(sizes[Math.floor(t / 2) % sizes.length]!);
      if (choice) choice.value = String(size);
    }
    quad.transform.setRotation(90 - Math.sin(t) * 20, Math.cos(t * 0.6) * 25, 0);
    const bytes = size * size * 4 * (4 / 3);
    info.text(`${size} x ${size} texture with mipmaps\n~${(bytes / 1048576).toFixed(2)} MB of GPU memory\n${size > 512 ? 'more detail than a ~300 px quad can show' : 'enough for this quad'}`);
  });
  stage.own(() => material.baseTexture?.destroy(true));
  return stage.dispose;
};

export default mount;
