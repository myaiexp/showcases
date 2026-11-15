// camera.viewport is a normalised x, y, width, height rectangle of the canvas
import { PrimitiveMesh, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.5, 6] });
  const say = caption(stage);
  const { entity } = add(root, PrimitiveMesh.createTorus(engine, 1, 0.4, 24, 48), pbr(engine, [0.9, 0.45, 0.3], 0.1, 0.35));
  spin(entity, [25, 35, 0]);
  const rect = new Vector4(0, 0, 1, 1);
  let manual = false;
  const apply = (): void => {
    camera.viewport = rect;
    const p = camera.pixelViewport;
    say(`viewport (${rect.x.toFixed(2)}, ${rect.y.toFixed(2)}, ${rect.z.toFixed(2)}, ${rect.w.toFixed(2)})  pixels ${Math.round(p.width)}x${Math.round(p.height)}`);
  };
  tick(camera.entity, (_dt, t) => {
    if (manual) return;
    const w = 0.55 + 0.25 * Math.sin(t * 0.9);
    const h = 0.55 + 0.25 * Math.cos(t * 0.7);
    rect.set((1 - w) * (0.5 + 0.5 * Math.sin(t * 0.5)), (1 - h) * (0.5 + 0.5 * Math.cos(t * 0.6)), w, h);
    apply();
  });
  if (!stage.preview) {
    const bind = (label: string, key: 'x' | 'y' | 'z' | 'w', value: number): void => {
      slider(stage.bar, label, 0, 1, 0.01, value, (v) => {
        manual = true;
        rect[key] = v;
        apply();
      });
    };
    bind('x', 'x', 0);
    bind('y', 'y', 0);
    bind('width', 'z', 1);
    bind('height', 'w', 1);
  }
  return stage.dispose;
};

export default mount;
