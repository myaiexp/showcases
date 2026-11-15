// ModelMesh.setNormals: per-face versus averaged normals
import { BlinnPhongMaterial, MeshRenderer, ModelMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { CUBE_CORNERS, CUBE_INDICES } from '../../shared/gfx-buffer.ts';

function flatCube(engine: ConstructorParameters<typeof ModelMesh>[0]): ModelMesh {
  const mesh = new ModelMesh(engine);
  const positions: Vector3[] = [];
  const normals: Vector3[] = [];
  const indices: number[] = [];
  for (let t = 0; t < CUBE_INDICES.length; t += 3) {
    const tri = [0, 1, 2].map((k) => {
      const c = CUBE_INDICES[t + k]! * 3;
      return new Vector3(CUBE_CORNERS[c]!, CUBE_CORNERS[c + 1]!, CUBE_CORNERS[c + 2]!);
    });
    const n = new Vector3();
    Vector3.cross(tri[1]!.clone().subtract(tri[0]!), tri[2]!.clone().subtract(tri[0]!), n);
    n.normalize();
    for (const p of tri) {
      indices.push(positions.length);
      positions.push(p);
      normals.push(n.clone());
    }
  }
  mesh.setPositions(positions);
  mesh.setNormals(normals);
  mesh.setIndices(new Uint16Array(indices));
  mesh.addSubMesh(0, indices.length);
  mesh.uploadData(false);
  return mesh;
}

function smoothCube(engine: ConstructorParameters<typeof ModelMesh>[0]): ModelMesh {
  const mesh = new ModelMesh(engine);
  const positions: Vector3[] = [];
  for (let i = 0; i < CUBE_CORNERS.length; i += 3) positions.push(new Vector3(CUBE_CORNERS[i], CUBE_CORNERS[i + 1], CUBE_CORNERS[i + 2]));
  mesh.setPositions(positions);
  mesh.setNormals(positions.map((p) => p.clone().normalize()));
  mesh.setIndices(new Uint16Array(CUBE_INDICES));
  mesh.addSubMesh(0, CUBE_INDICES.length);
  mesh.uploadData(false);
  return mesh;
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.5, 6] });
  const say = caption(stage);
  const flat = flatCube(engine);
  const smooth = smoothCube(engine);
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.8, 0.45, 0.3, 1);
  material.shininess = 60;
  const entity = root.createChild('cube');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.setMaterial(material);
  spin(entity, [15, 35, 0]);
  stage.own(() => {
    flat.destroy();
    smooth.destroy();
  });
  const apply = (isSmooth: boolean): void => {
    renderer.mesh = isSmooth ? smooth : flat;
    say(isSmooth ? '8 vertices, normals = normalized positions' : '24 vertices, one normal per face');
  };
  if (stage.preview) steps(entity, 2.5, 2, (i) => apply(i === 1));
  else {
    apply(false);
    checkbox(stage.bar, 'smooth normals', false, apply);
  }
  return stage.dispose;
};

export default mount;
