// FresnelParameters on a StandardMaterial: emissive and opacity change with the viewing angle
import { ArcRotateCamera, Color3, FresnelParameters, HemisphericLight, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addSlider, addToggle, createPanel } from './controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.4, 6, Vector3.Zero(), scene);
  scene.clearColor.set(0.04, 0.05, 0.08, 1);
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 0.6;

  // A back sphere makes the glass-like opacity visible.
  const core = MeshBuilder.CreateSphere('core', { diameter: 1.2, segments: 24 }, scene);
  const coreMaterial = new StandardMaterial('coreMaterial', scene);
  coreMaterial.diffuseColor = new Color3(1, 0.4, 0.2);
  core.material = coreMaterial;

  const material = new StandardMaterial('glass', scene);
  material.diffuseColor = Color3.Black();
  material.emissiveColor = new Color3(0.4, 0.6, 1);
  material.alpha = 0.3;
  material.specularPower = 16;

  // leftColor is used on the edges, rightColor in the centre; bias and power shape the falloff.
  const emissive = new FresnelParameters();
  emissive.bias = 0.2;
  emissive.power = 3;
  emissive.leftColor = Color3.White();
  emissive.rightColor = Color3.Black();
  material.emissiveFresnelParameters = emissive;

  const opacity = new FresnelParameters();
  opacity.bias = 0.1;
  opacity.power = 2;
  opacity.leftColor = Color3.White();
  opacity.rightColor = Color3.Black();
  material.opacityFresnelParameters = opacity;

  const shell = MeshBuilder.CreateSphere('shell', { diameter: 3, segments: ctx.preview ? 24 : 48 }, scene);
  shell.material = material;

  let panel: HTMLElement | undefined;
  if (ctx.preview) {
    stage.run(() => (camera.alpha += 0.005));
  } else {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    addToggle(panel, 'Emissive fresnel', true, (on) => (emissive.isEnabled = on));
    addToggle(panel, 'Opacity fresnel', true, (on) => (opacity.isEnabled = on));
    addSlider(panel, 'Power', [0.5, 8, 0.1], 3, (v) => {
      emissive.power = v;
      opacity.power = v;
    });
    addSlider(panel, 'Bias', [0, 1, 0.01], 0.2, (v) => (emissive.bias = v));
    stage.run();
  }

  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
