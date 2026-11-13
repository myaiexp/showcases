// A CascadedShadowGenerator over a long field, with its cascades coloured by the debug flag
import {
  ArcRotateCamera,
  CascadedShadowGenerator,
  Color3,
  DirectionalLight,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from './controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.72, 0.85, 0.95, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.25, 24, new Vector3(0, 1, 18), scene);
  camera.maxZ = 120; // CascadedShadowGenerator takes its shadowMaxZ from the camera
  camera.lowerBetaLimit = 0.6;
  camera.upperBetaLimit = Math.PI / 2.05;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('ambient', new Vector3(0, 1, 0), scene).intensity = 0.35;

  const sun = new DirectionalLight('sun', new Vector3(-0.5, -1, 0.35), scene);
  sun.intensity = 1.1;

  const ground = MeshBuilder.CreateGround('ground', { width: 60, height: 160 }, scene);
  ground.position.z = 60;
  ground.receiveShadows = true;
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.78, 0.78, 0.74);
  groundMat.specularColor = Color3.Black();
  ground.material = groundMat;

  const csm = new CascadedShadowGenerator(ctx.preview ? 1024 : 2048, sun);
  csm.usePercentageCloserFiltering = true; // CSM supports PCF, PCSS or no filter
  csm.shadowMaxZ = camera.maxZ;
  csm.debug = true;

  // Pillars in two rows running away from the camera.
  const pillarMat = new StandardMaterial('pillarMat', scene);
  pillarMat.diffuseColor = new Color3(0.85, 0.45, 0.25);
  for (let i = 0; i < 24; i++) {
    for (const x of [-6, 6]) {
      const h = 3 + (i % 3);
      const p = MeshBuilder.CreateCylinder(`pillar${i}${x}`, { diameter: 1.2, height: h, tessellation: 16 }, scene);
      p.position.set(x + (i % 2) * 2, h / 2, 2 + i * 4);
      p.material = pillarMat;
      p.receiveShadows = true;
      csm.addShadowCaster(p);
    }
  }

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel sliders';
    const dbg = document.createElement('button');
    dbg.classList.add('btn');
    dbg.textContent = 'debug: true';
    dbg.onclick = () => {
      csm.debug = !csm.debug;
      dbg.textContent = `debug: ${csm.debug}`;
    };
    const stab = document.createElement('button');
    stab.classList.add('btn');
    stab.textContent = 'stabilizeCascades: false';
    stab.onclick = () => {
      csm.stabilizeCascades = !csm.stabilizeCascades;
      stab.textContent = `stabilizeCascades: ${csm.stabilizeCascades}`;
    };
    panel.append(
      slider('numCascades', 2, 4, csm.numCascades, (v) => (csm.numCascades = v), 1).row,
      slider('lambda', 0, 1, csm.lambda, (v) => (csm.lambda = v), 0.05).row,
      slider('cascadeBlendPercentage', 0, 0.3, csm.cascadeBlendPercentage, (v) => (csm.cascadeBlendPercentage = v), 0.01).row,
      slider('shadowMaxZ', 20, 120, csm.shadowMaxZ, (v) => (csm.shadowMaxZ = v), 5).row,
      dbg,
      stab,
    );
    el.append(panel);
  }

  let t = 0;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    if (ctx.preview) camera.alpha = -Math.PI / 2 + Math.sin(t * 0.4) * 0.5;
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
