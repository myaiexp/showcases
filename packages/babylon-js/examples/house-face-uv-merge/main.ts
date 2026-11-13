// A box textured per face with faceUV, merged with a prism roof via MergeMeshes
import {
  ArcRotateCamera,
  Color3,
  DynamicTexture,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  Vector4,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drawHouseAtlas, PANEL } from './atlas.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.72, 0.85, 0.95, 1);

  const camera = new ArcRotateCamera('camera', -Math.PI / 3, Math.PI / 3, 5, new Vector3(0, 0.8, 0), scene);
  camera.lowerRadiusLimit = 2.5;
  camera.upperBetaLimit = Math.PI / 2.1;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);

  const ground = MeshBuilder.CreateGround('ground', { width: 8, height: 8 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.35, 0.6, 0.3);
  ground.material = groundMat;

  // The atlas: four equal images side by side, each 0.25 of the texture width.
  const atlas = new DynamicTexture('houseAtlas', { width: PANEL * 4, height: PANEL }, scene);
  drawHouseAtlas(atlas.getContext() as CanvasRenderingContext2D);
  atlas.update();
  const boxMat = new StandardMaterial('boxMat', scene);
  boxMat.diffuseTexture = atlas;
  const roofMat = new StandardMaterial('roofMat', scene);
  roofMat.diffuseColor = new Color3(0.6, 0.18, 0.15);

  // faceUV: 0 back, 1 front, 2 right, 3 left. Each Vector4 is (u0, v0, u1, v1).
  const faceUV: Vector4[] = [];
  faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); // rear face
  faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); // front face
  faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); // right side
  faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); // left side

  let house: Mesh | null = null;
  const build = (keepMaterials: boolean): void => {
    house?.dispose();
    const box = MeshBuilder.CreateBox('box', { faceUV, wrap: true }, scene);
    box.material = boxMat;
    box.position.y = 0.5;
    const roof = MeshBuilder.CreateCylinder('roof', { diameter: 1.3, height: 1.2, tessellation: 3 }, scene);
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    // MergeMeshes(meshes, disposeSource, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterials)
    house = Mesh.MergeMeshes([box, roof], true, false, undefined, false, keepMaterials);
  };
  build(true);

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const label = document.createElement('span');
    label.textContent = 'MergeMeshes multiMultiMaterials:';
    panel.append(label);
    for (const [text, keep] of [['true', true], ['false', false]] as const) {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = text;
      b.onclick = () => build(keep);
      panel.append(b);
    }
    el.append(panel);
  }

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.008;
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
