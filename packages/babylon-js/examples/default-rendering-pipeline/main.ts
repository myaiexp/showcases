// DefaultRenderingPipeline: toggle bloom, FXAA, chromatic aberration, grain and sharpen
import { ArcRotateCamera, Color3, DefaultRenderingPipeline, HemisphericLight, type Mesh, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addSlider, addToggle, createPanel } from './controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.4, 12, Vector3.Zero(), scene);
  scene.clearColor.set(0.02, 0.02, 0.04, 1);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene).intensity = 0.4;

  // A ring of bright emissive spheres: they give bloom something to spread.
  const spheres: Mesh[] = [];
  const count = 7;
  for (let i = 0; i < count; i++) {
    const material = new StandardMaterial(`glow-${i}`, scene);
    material.emissiveColor = Color3.FromHSV((i / count) * 360, 0.8, 1);
    const sphere = MeshBuilder.CreateSphere(`sphere-${i}`, { diameter: 1.4, segments: 24 }, scene);
    const a = (i / count) * Math.PI * 2;
    sphere.position.set(Math.cos(a) * 3.4, Math.sin(a * 2) * 0.8, Math.sin(a) * 3.4);
    sphere.material = material;
    spheres.push(sphere);
  }
  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1.2, tube: 0.4, radialSegments: 96 }, scene);
  knot.material = new StandardMaterial('knotMaterial', scene);

  // The pipeline attaches to the cameras you list; `true` asks for an HDR texture.
  const pipeline = new DefaultRenderingPipeline('default', true, scene, [camera]);
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.6;
  pipeline.bloomWeight = 0.5;
  pipeline.bloomKernel = 64;
  pipeline.bloomScale = 0.5;
  pipeline.chromaticAberrationEnabled = true;
  pipeline.chromaticAberration.aberrationAmount = 60;
  pipeline.grainEnabled = true;
  pipeline.grain.intensity = 12;
  pipeline.grain.animated = true;

  let panel: HTMLElement | undefined;
  if (!ctx.preview) {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    addToggle(panel, 'Bloom', true, (on) => (pipeline.bloomEnabled = on));
    addToggle(panel, 'FXAA', false, (on) => (pipeline.fxaaEnabled = on));
    addToggle(panel, 'Chromatic aberration', true, (on) => (pipeline.chromaticAberrationEnabled = on));
    addToggle(panel, 'Grain', true, (on) => (pipeline.grainEnabled = on));
    addToggle(panel, 'Sharpen', false, (on) => (pipeline.sharpenEnabled = on));
    addSlider(panel, 'Bloom weight', [0, 1.5, 0.05], 0.5, (v) => (pipeline.bloomWeight = v));
    addSlider(panel, 'Aberration', [0, 300, 5], 60, (v) => (pipeline.chromaticAberration.aberrationAmount = v));
  }

  stage.run(() => {
    const t = performance.now() / 1000;
    spheres.forEach((s, i) => (s.position.y = Math.sin(t + i) * 0.9));
    knot.rotation.y += 0.01;
    if (ctx.preview) camera.alpha += 0.004;
  });

  return () => {
    panel?.remove();
    pipeline.dispose();
    stage.dispose();
  };
};

export default mount;
