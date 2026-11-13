// Two cameras share the canvas through scene.activeCameras and a Viewport each
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  PointLight,
  StandardMaterial,
  UniversalCamera,
  Vector3,
  Viewport,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  new HemisphericLight('light', new Vector3(0, 1, -0.3), scene).intensity = 0.6;
  new PointLight('point', new Vector3(3, 6, -3), scene);

  const ground = MeshBuilder.CreateGround('ground', { width: 14, height: 14 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.3, 0.4, 0.35);
  ground.material = groundMat;
  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1.2, tube: 0.35, radialSegments: 96 }, scene);
  knot.position.y = 2;
  const knotMat = new StandardMaterial('knotMat', scene);
  knotMat.diffuseColor = new Color3(0.95, 0.55, 0.2);
  knot.material = knotMat;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const s = MeshBuilder.CreateSphere(`s${i}`, { diameter: 1 }, scene);
    s.position.set(Math.cos(a) * 4.5, 0.5, Math.sin(a) * 4.5);
  }

  // Camera 1 orbits the knot; camera 2 looks straight down from above.
  const orbit = new ArcRotateCamera('orbit', -Math.PI / 2, Math.PI / 3, 12, new Vector3(0, 1.5, 0), scene);
  const top = new UniversalCamera('top', new Vector3(0, 16, 0.01), scene);
  top.setTarget(Vector3.Zero());
  if (!ctx.preview) orbit.attachControl(canvas, true);

  scene.activeCameras = [orbit, top];
  // Viewport(x, y, width, height): fractions of the canvas, from the lower-left corner.
  const layout = (split: number, vertical: boolean): void => {
    if (vertical) {
      orbit.viewport = new Viewport(0, 1 - split, 1, split);
      top.viewport = new Viewport(0, 0, 1, 1 - split);
    } else {
      orbit.viewport = new Viewport(0, 0, split, 1);
      top.viewport = new Viewport(split, 0, 1 - split, 1);
    }
  };
  let split = 0.5;
  let vertical = false;
  layout(split, vertical);

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0.15';
    range.max = '0.85';
    range.step = '0.01';
    range.value = String(split);
    range.oninput = () => {
      split = Number(range.value);
      layout(split, vertical);
    };
    const flip = document.createElement('button');
    flip.classList.add('btn');
    flip.textContent = 'Stack instead of side by side';
    flip.onclick = () => {
      vertical = !vertical;
      layout(split, vertical);
    };
    panel.append('Orbit camera share', range, flip);
    el.append(panel);
  }

  stage.run(() => {
    knot.rotation.y += 0.01;
    if (ctx.preview) orbit.alpha += 0.006;
  });
  return () => {
    panel?.remove();
    scene.activeCameras = [];
    stage.dispose();
  };
};

export default mount;
