// MeshRenderer.enableVertexColor with colours written to a PrimitiveMesh
import { Color, MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin, steps, unlit } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 5], light: false });
  const say = caption(stage);
  const mesh = PrimitiveMesh.createSphere(engine, 1.4, 24);
  const colors = mesh.getPositions()!.map((p) => new Color(0.5 + 0.5 * p.x / 1.4, 0.5 + 0.5 * p.y / 1.4, 0.5 + 0.5 * p.z / 1.4, 1));
  mesh.setColors(colors);
  mesh.uploadData(false);
  const entity = root.createChild('sphere');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(unlit(engine, [1, 1, 1]));
  spin(entity, [10, 30, 0]);
  const apply = (on: boolean): void => {
    renderer.enableVertexColor = on;
    say(`enableVertexColor = ${on}`);
  };
  if (stage.preview) steps(entity, 2.2, 2, (i) => apply(i === 0));
  else {
    apply(true);
    checkbox(stage.bar, 'enableVertexColor', true, apply);
  }
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
