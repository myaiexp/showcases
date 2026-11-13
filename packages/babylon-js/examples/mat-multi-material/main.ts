// MultiMaterial: one sphere, three submeshes, three materials by index range
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  MultiMaterial,
  StandardMaterial,
  SubMesh,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 7, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);

  const material0 = new StandardMaterial('mat0', scene);
  material0.diffuseColor = new Color3(1, 0.3, 0.2);
  const material1 = new StandardMaterial('mat1', scene);
  material1.diffuseColor = new Color3(0.2, 0.4, 1);
  material1.wireframe = true;
  const material2 = new StandardMaterial('mat2', scene);
  material2.emissiveColor = new Color3(0.5, 0.1, 0.5);

  const multimat = new MultiMaterial('multi', scene);
  multimat.subMaterials.push(material0, material1, material2);

  const sphere = MeshBuilder.CreateSphere('Sphere0', { segments: 16, diameter: 3 }, scene);
  sphere.material = multimat;

  // By default a mesh is one submesh using sub-material 0. Split its index buffer in three:
  // SubMesh(materialIndex, verticesStart, verticesCount, indexStart, indexCount, mesh).
  const verticesCount = sphere.getTotalVertices();
  const indexCount = sphere.getTotalIndices();
  const split = (a: number, b: number): void => {
    // Index ranges must hold whole triangles.
    const i1 = Math.round((indexCount * a) / 3) * 3;
    const i2 = Math.round((indexCount * b) / 3) * 3;
    sphere.releaseSubMeshes();
    new SubMesh(0, 0, verticesCount, 0, i1, sphere);
    new SubMesh(1, 0, verticesCount, i1, i2 - i1, sphere);
    new SubMesh(2, 0, verticesCount, i2, indexCount - i2, sphere);
  };
  const bounds = { a: 0.33, b: 0.66 };
  split(bounds.a, bounds.b);

  let readout: HTMLElement | undefined;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('first boundary', 0.05, 0.9, 0.01, bounds.a, (v) => ((bounds.a = Math.min(v, bounds.b - 0.02)), split(bounds.a, bounds.b)));
    panel.slider('second boundary', 0.1, 0.95, 0.01, bounds.b, (v) => ((bounds.b = Math.max(v, bounds.a + 0.02)), split(bounds.a, bounds.b)));
    readout = panel.readout();
  }

  let t = 0;
  stage.run(() => {
    sphere.rotation.y += 0.006;
    if (ctx.preview) {
      // The card slides the bands up and down the sphere.
      t += 0.01;
      split(0.3 + Math.sin(t) * 0.2, 0.7 + Math.sin(t * 1.3) * 0.2);
    }
    if (readout) readout.textContent = sphere.subMeshes.map((s) => `submesh → mat${s.materialIndex}: indices ${s.indexStart}–${s.indexStart + s.indexCount}`).join(' · ');
  });

  return () => stage.dispose();
};

export default mount;
