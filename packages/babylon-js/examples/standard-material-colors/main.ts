// StandardMaterial diffuse, specular and emissive colours under a point light
import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, PointLight, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addColor, addSlider, createPanel } from './controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.4, 5, Vector3.Zero(), scene);
  const fill = new HemisphericLight('fill', new Vector3(0, 1, 0), scene);
  fill.intensity = 0.4;
  // Specular highlights only appear under a light that has a position.
  const lamp = new PointLight('lamp', new Vector3(-3, 4, -4), scene);

  // The material the docs describe: diffuse, specular and emissive colours.
  const material = new StandardMaterial('material', scene);
  material.diffuseColor = new Color3(1, 0, 1);
  material.specularColor = new Color3(0.5, 0.6, 0.87);
  material.emissiveColor = new Color3(0.05, 0, 0.1);
  material.specularPower = 32;

  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2.6, segments: 48 }, scene);
  sphere.material = material;

  let panel: HTMLElement | undefined;
  if (ctx.preview) {
    // Cards have no input, so sweep the diffuse hue on its own.
    let hue = 0;
    stage.run(() => {
      camera.alpha += 0.006;
      hue = (hue + 0.5) % 360;
      material.diffuseColor = Color3.FromHSV(hue, 0.8, 1);
    });
  } else {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    addColor(panel, 'Diffuse', '#ff00ff', (hex) => (material.diffuseColor = Color3.FromHexString(hex)));
    addColor(panel, 'Specular', '#8099de', (hex) => (material.specularColor = Color3.FromHexString(hex)));
    addColor(panel, 'Emissive', '#0d001a', (hex) => (material.emissiveColor = Color3.FromHexString(hex)));
    addSlider(panel, 'Specular power', [1, 128, 1], 32, (v) => (material.specularPower = v));
    stage.run(() => {
      lamp.position.x = Math.sin(performance.now() / 1500) * 4;
    });
  }

  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
