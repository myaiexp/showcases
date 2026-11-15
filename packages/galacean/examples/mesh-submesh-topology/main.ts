// addSubMesh(start, count, topology): one vertex list, five ways to connect it
import { MeshRenderer, MeshTopology, ModelMesh, UnlitMaterial, Vector3, RenderFace } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';

const NAMES = ['Lines', 'LineLoop', 'LineStrip', 'Triangles', 'TriangleStrip'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 6], light: false });
  const say = caption(stage);
  const positions: Vector3[] = [];
  for (let i = 0; i < 10; i++) positions.push(new Vector3(-2.4 + i * 0.53, i % 2 ? 1.2 : -1.2, 0));
  const mesh = new ModelMesh(engine);
  mesh.setPositions(positions);
  mesh.uploadData(false);
  const material = new UnlitMaterial(engine);
  material.baseColor.set(0.95, 0.75, 0.3, 1);
  material.renderFace = RenderFace.Double;
  const entity = root.createChild('zigzag');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(material);
  spin(entity, [0, 25, 0]);
  stage.own(() => mesh.destroy());
  const apply = (name: (typeof NAMES)[number]): void => {
    mesh.clearSubMesh();
    mesh.addSubMesh(0, 10, MeshTopology[name]);
    say(`addSubMesh(0, 10, MeshTopology.${name})`);
  };
  if (stage.preview) steps(entity, 2, NAMES.length, (i) => apply(NAMES[i]!));
  else {
    apply('Triangles');
    select(stage.bar, 'topology', NAMES, apply, 'Triangles');
  }
  return stage.dispose;
};

export default mount;
