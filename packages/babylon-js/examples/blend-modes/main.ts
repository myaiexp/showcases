// alphaMode blend modes: one translucent sphere composited over a striped backdrop
import { ArcRotateCamera, Color3, DynamicTexture, Engine, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addButton, createPanel } from './controls.ts';
import './style.css';

const MODES = [
  ['ALPHA_COMBINE', Engine.ALPHA_COMBINE],
  ['ALPHA_ADD', Engine.ALPHA_ADD],
  ['ALPHA_SUBTRACT', Engine.ALPHA_SUBTRACT],
  ['ALPHA_MULTIPLY', Engine.ALPHA_MULTIPLY],
  ['ALPHA_MAXIMIZED', Engine.ALPHA_MAXIMIZED],
  ['ALPHA_ONEONE', Engine.ALPHA_ONEONE],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 6, Vector3.Zero(), scene);
  scene.clearColor.set(0.1, 0.1, 0.12, 1);

  // Backdrop: coloured stripes drawn into a DynamicTexture, shown unlit through emissiveTexture.
  const stripes = new DynamicTexture('stripes', 256, scene);
  const g = stripes.getContext();
  const colors = ['#e63946', '#f4a261', '#e9c46a', '#2a9d8f', '#457b9d', '#9b5de5'];
  colors.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect((i * 256) / colors.length, 0, 256 / colors.length + 1, 256);
  });
  stripes.update();
  const backdropMaterial = new StandardMaterial('backdropMaterial', scene);
  backdropMaterial.disableLighting = true;
  backdropMaterial.emissiveTexture = stripes;
  const backdrop = MeshBuilder.CreatePlane('backdrop', { width: 9, height: 4 }, scene);
  backdrop.position.z = 1;
  backdrop.material = backdropMaterial;

  // alphaMode only applies to alpha-blended meshes, so the material gets alpha < 1.
  const material = new StandardMaterial('overlay', scene);
  material.disableLighting = true;
  material.emissiveColor = new Color3(0.9, 0.6, 0.3);
  material.alpha = 0.7;
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 3, segments: 24 }, scene);
  sphere.position.z = -0.5;
  sphere.material = material;

  let panel: HTMLElement | undefined;
  let timer = 0;
  const buttons: HTMLButtonElement[] = [];
  const select = (index: number) => {
    material.alphaMode = MODES[index]![1];
    buttons.forEach((b, i) => b.classList.toggle('active', i === index));
  };
  if (ctx.preview) {
    // Cycle through the modes on a timer.
    let index = 0;
    material.alphaMode = MODES[0][1];
    timer = window.setInterval(() => {
      index = (index + 1) % MODES.length;
      material.alphaMode = MODES[index]![1];
    }, 1200);
    stage.run(() => (sphere.position.x = Math.sin(performance.now() / 900) * 1.8));
  } else {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    MODES.forEach(([name], i) => buttons.push(addButton(panel!, name, () => select(i))));
    select(0);
    stage.run(() => (sphere.position.x = Math.sin(performance.now() / 1500) * 1.8));
  }

  return () => {
    clearInterval(timer);
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
