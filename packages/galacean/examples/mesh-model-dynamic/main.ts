// uploadData(false) keeps vertex data so a ModelMesh can be edited continuously
import { BlinnPhongMaterial, MeshRenderer, ModelMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const N = 40;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 4, 6], target: [0, 0, 0] });
  const say = caption(stage);
  const mesh = new ModelMesh(engine);
  const positions: Vector3[] = [];
  const normals: Vector3[] = [];
  for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) {
    positions.push(new Vector3((i / N - 0.5) * 6, 0, (j / N - 0.5) * 6));
    normals.push(new Vector3(0, 1, 0));
  }
  const indices: number[] = [];
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const a = j * (N + 1) + i;
    indices.push(a, a + N + 1, a + 1, a + 1, a + N + 1, a + N + 2);
  }
  mesh.setIndices(new Uint16Array(indices));
  mesh.addSubMesh(0, indices.length);
  const height = (x: number, z: number, t: number, amp: number): number => amp * (Math.sin(x * 1.6 + t * 2) * 0.5 + Math.sin(z * 2.1 - t * 1.4) * 0.5);
  const update = (t: number, amp: number): void => {
    positions.forEach((p, k) => {
      p.y = height(p.x, p.z, t, amp);
      const e = 0.05;
      normals[k]!.set(height(p.x - e, p.z, t, amp) - height(p.x + e, p.z, t, amp), 2 * e, height(p.x, p.z - e, t, amp) - height(p.x, p.z + e, t, amp)).normalize();
    });
    mesh.setPositions(positions);
    mesh.setNormals(normals);
    mesh.uploadData(false);
  };
  update(0, 0.4);
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.25, 0.5, 0.8, 1);
  material.shininess = 80;
  const entity = root.createChild('wave');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(material);
  stage.own(() => mesh.destroy());
  let amp = 0.4;
  if (!stage.preview) slider(stage.bar, 'amplitude', 0, 1, 0.02, amp, (v) => (amp = v));
  tick(root, (_dt, t) => {
    update(t, amp);
    say(`${positions.length} vertices rewritten per frame`);
  });
  return stage.dispose;
};

export default mount;
