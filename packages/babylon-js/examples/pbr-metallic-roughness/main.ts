// PBRMaterial metallic and roughness across a grid of spheres, lit by plain lights
import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, PBRMaterial, PointLight, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addColor, addSlider, createPanel } from './controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.3, ctx.preview ? 11 : 10, Vector3.Zero(), scene);
  scene.clearColor.set(0.08, 0.09, 0.11, 1);
  // No environment texture is loaded, so metals reflect only what the lights give them.
  const sky = new HemisphericLight('sky', new Vector3(0, 1, 0), scene);
  sky.intensity = 0.8;
  new PointLight('key', new Vector3(-4, 5, -6), scene);
  new PointLight('rim', new Vector3(5, 2, -5), scene).diffuse = new Color3(0.6, 0.7, 1);

  // A 5 x 3 grid: metallic runs left to right (0..1), roughness runs top to bottom.
  const materials: PBRMaterial[] = [];
  const columns = 5;
  const rows = 3;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const material = new PBRMaterial(`pbr-${row}-${col}`, scene);
      material.albedoColor = new Color3(0.95, 0.65, 0.25);
      material.metallic = col / (columns - 1);
      material.roughness = row / (rows - 1);
      materials.push(material);
      const sphere = MeshBuilder.CreateSphere(`sphere-${row}-${col}`, { diameter: 1.6, segments: ctx.preview ? 16 : 32 }, scene);
      sphere.position.set((col - (columns - 1) / 2) * 1.9, (1 - row) * 1.9, 0);
      sphere.material = material;
    }
  }

  let panel: HTMLElement | undefined;
  if (ctx.preview) {
    stage.run(() => (camera.alpha += 0.004));
  } else {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    addColor(panel, 'Albedo', '#f2a640', (hex) => {
      for (const m of materials) m.albedoColor = Color3.FromHexString(hex);
    });
    // Override the grid with one metallic / roughness value on every sphere, or restore the grid.
    addSlider(panel, 'Metallic (all)', [0, 1, 0.01], 0.5, (v) => materials.forEach((m) => (m.metallic = v)));
    addSlider(panel, 'Roughness (all)', [0, 1, 0.01], 0.5, (v) => materials.forEach((m) => (m.roughness = v)));
    stage.run();
  }

  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
