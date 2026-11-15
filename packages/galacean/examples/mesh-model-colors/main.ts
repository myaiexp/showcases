// ModelMesh.setColors and MeshRenderer.enableVertexColor
import { RenderFace, Color, MeshRenderer, ModelMesh, UnlitMaterial, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  const SIDES = 6;
  const positions = [new Vector3(0, 0, 0)];
  const colors = [new Color(1, 1, 1, 1)];
  for (let i = 0; i < SIDES; i++) {
    const a = (i / SIDES) * Math.PI * 2;
    positions.push(new Vector3(Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0));
    const h = i / SIDES;
    colors.push(new Color(0.5 + 0.5 * Math.cos(h * 6.283), 0.5 + 0.5 * Math.cos((h + 0.33) * 6.283), 0.5 + 0.5 * Math.cos((h + 0.67) * 6.283), 1));
  }
  const indices: number[] = [];
  for (let i = 0; i < SIDES; i++) indices.push(0, 1 + i, 1 + ((i + 1) % SIDES));
  const mesh = new ModelMesh(engine);
  mesh.setPositions(positions);
  mesh.setColors(colors);
  mesh.setIndices(new Uint16Array(indices));
  mesh.addSubMesh(0, indices.length);
  mesh.uploadData(false);
  const entity = root.createChild('fan');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  const material = new UnlitMaterial(engine);
  material.baseColor.set(0.9, 0.9, 0.9, 1);
  material.renderFace = RenderFace.Double;
  renderer.setMaterial(material);
  spin(entity, [0, 0, 20]);
  stage.own(() => mesh.destroy());
  const apply = (on: boolean): void => {
    renderer.enableVertexColor = on;
    say(`enableVertexColor = ${on}`);
  };
  if (stage.preview) steps(entity, 2.5, 2, (i) => apply(i === 0));
  else {
    apply(true);
    checkbox(stage.bar, 'enableVertexColor', true, apply);
  }
  return stage.dispose;
};

export default mount;
