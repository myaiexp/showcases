// Scene fog in its four modes (none, exp, exp2, linear) over a receding row of columns
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from './controls.ts';
import './style.css';

const MODES: [string, number][] = [
  ['FOGMODE_NONE', Scene.FOGMODE_NONE],
  ['FOGMODE_EXP', Scene.FOGMODE_EXP],
  ['FOGMODE_EXP2', Scene.FOGMODE_EXP2],
  ['FOGMODE_LINEAR', Scene.FOGMODE_LINEAR],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const fogColor = new Color3(0.9, 0.9, 0.85);
  scene.clearColor.set(fogColor.r, fogColor.g, fogColor.b, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.38, 14, new Vector3(0, 2, 20), scene);
  camera.upperBetaLimit = Math.PI / 2.05;
  camera.maxZ = 400;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.2, 1, -0.4), scene);

  const ground = MeshBuilder.CreateGround('ground', { width: 40, height: 300 }, scene);
  ground.position.z = 120;
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.45, 0.6, 0.4);
  groundMat.specularColor = Color3.Black();
  ground.material = groundMat;
  const colMat = new StandardMaterial('colMat', scene);
  colMat.diffuseColor = new Color3(0.75, 0.3, 0.25);
  for (let i = 0; i < 30; i++) {
    for (const x of [-5, 5]) {
      const c = MeshBuilder.CreateCylinder(`col${i}${x}`, { diameter: 1.5, height: 6, tessellation: 12 }, scene);
      c.position.set(x, 3, i * 8);
      c.material = colMat;
    }
  }

  // Fog is plain scene state: a mode, then the density or the start/end distances, then a colour.
  scene.fogMode = Scene.FOGMODE_EXP;
  scene.fogDensity = 0.02;
  scene.fogStart = 20;
  scene.fogEnd = 80;
  scene.fogColor = fogColor;

  let panel: HTMLElement | null = null;
  const buttons: HTMLButtonElement[] = [];
  const mark = (): void => buttons.forEach((b, i) => b.classList.toggle('on', MODES[i]![1] === scene.fogMode));
  let auto = ctx.preview;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel sliders';
    const row = document.createElement('div');
    row.className = 'buttons';
    MODES.forEach(([name, mode]) => {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = name;
      b.onclick = () => {
        scene.fogMode = mode;
        mark();
      };
      buttons.push(b);
      row.append(b);
    });
    panel.append(
      row,
      slider('fogDensity (EXP, EXP2)', 0.002, 0.1, scene.fogDensity, (v) => (scene.fogDensity = v), 0.002).row,
      slider('fogStart (LINEAR)', 0, 100, scene.fogStart, (v) => (scene.fogStart = v), 1).row,
      slider('fogEnd (LINEAR)', 20, 200, scene.fogEnd, (v) => (scene.fogEnd = v), 1).row,
    );
    el.append(panel);
    mark();
  }

  let t = 0;
  let last = -1;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    if (!ctx.preview) return;
    camera.alpha = -Math.PI / 2 + Math.sin(t * 0.3) * 0.3;
    const i = Math.floor(t / 3) % MODES.length;
    if (auto && i !== last) {
      last = i;
      scene.fogMode = MODES[i]![1];
    }
  });
  return () => {
    auto = false;
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
