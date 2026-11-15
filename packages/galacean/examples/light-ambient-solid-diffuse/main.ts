// AmbientLight.diffuseMode SolidColor with diffuseSolidColor
import { AmbientLight, DiffuseMode, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, spin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 3, 7], target: [0, 0.5, 0], light: false });
  const say = caption(stage);
  floor(root, engine, -1, 16, pbr(engine, [0.8, 0.8, 0.8], 0, 0.9));
  [PrimitiveMesh.createSphere(engine, 0.9), PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), PrimitiveMesh.createTorus(engine, 0.8, 0.3)].forEach((m, i) =>
    spin(add(root, m, pbr(engine, [0.9, 0.9, 0.9], 0, 0.8), [(i - 1) * 2.4, 0, 0]).entity, [0, 25, 0]),
  );
  const ambient = new AmbientLight(engine);
  ambient.diffuseMode = DiffuseMode.SolidColor;
  stage.scene.ambientLight = ambient;
  const set = (r: number, g: number, b: number): void => {
    ambient.diffuseSolidColor.set(r, g, b, 1);
    say(`diffuseSolidColor (${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)})`);
  };
  if (stage.preview) tick(camera.entity, (_dt, t) => set(0.6 + 0.4 * Math.sin(t * 0.7), 0.6 + 0.4 * Math.sin(t * 0.7 + 2), 0.6 + 0.4 * Math.sin(t * 0.7 + 4)));
  else {
    set(0.8, 0.8, 0.8);
    color(stage.bar, 'diffuseSolidColor', [0.9, 0.9, 0.9], (c) => set(c[0] ** 2.2, c[1] ** 2.2, c[2] ** 2.2));
  }
  return stage.dispose;
};

export default mount;
