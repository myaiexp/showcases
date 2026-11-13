// ArcRotateCamera auto-rotation, bouncing and framing behaviors, each switched on by a property
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { AbstractMesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 14, new Vector3(0, 1, 0), scene);
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 18;
  camera.upperBetaLimit = Math.PI / 2.05;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);

  const ground = MeshBuilder.CreateGround('ground', { width: 30, height: 30 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.25, 0.3, 0.35);
  ground.material = groundMat;

  const tint = (m: AbstractMesh, c: Color3): void => {
    const mat = new StandardMaterial(`${m.name}Mat`, scene);
    mat.diffuseColor = c;
    m.material = mat;
  };
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 3 }, scene);
  sphere.position.set(-5, 1.5, 0);
  tint(sphere, new Color3(0.9, 0.5, 0.2));
  const box = MeshBuilder.CreateBox('box', { size: 1.5 }, scene);
  box.position.set(5, 0.75, 2);
  tint(box, new Color3(0.3, 0.7, 0.9));
  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1.4, tube: 0.4, radialSegments: 80 }, scene);
  knot.position.set(0, 2, -4);
  tint(knot, new Color3(0.8, 0.35, 0.7));
  const meshes: [string, AbstractMesh][] = [['sphere', sphere], ['box', box], ['torus knot', knot]];

  // Behaviors are enabled with these three flags; the behavior objects then hold the settings.
  camera.useAutoRotationBehavior = true;
  camera.autoRotationBehavior!.idleRotationSpeed = 0.4;
  camera.autoRotationBehavior!.idleRotationWaitTime = ctx.preview ? 0 : 1500;
  camera.useBouncingBehavior = !ctx.preview;
  camera.useFramingBehavior = true;
  const framing = camera.framingBehavior!;
  framing.framingTime = 1200;
  framing.radiusScale = 1.4;

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const toggle = (label: string, get: () => boolean, set: (v: boolean) => void): void => {
      const l = document.createElement('label');
      const c = document.createElement('input');
      c.type = 'checkbox';
      c.checked = get();
      c.onchange = () => set(c.checked);
      l.append(c, label);
      panel!.append(l);
    };
    toggle('useAutoRotationBehavior', () => camera.useAutoRotationBehavior, (v) => (camera.useAutoRotationBehavior = v));
    toggle('useBouncingBehavior', () => camera.useBouncingBehavior, (v) => (camera.useBouncingBehavior = v));
    toggle('useFramingBehavior', () => camera.useFramingBehavior, (v) => (camera.useFramingBehavior = v));
    for (const [name, mesh] of meshes) {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = `zoomOnMesh(${name})`;
      b.onclick = () => camera.framingBehavior?.zoomOnMesh(mesh);
      panel.append(b);
    }
    el.append(panel);
  }

  let t = 0;
  let last = -1;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    if (!ctx.preview) return;
    // With no pointer input, the framing behavior visits each mesh in turn while the camera spins.
    const i = Math.floor(t / 4) % meshes.length;
    if (i !== last) {
      last = i;
      framing.zoomOnMesh(meshes[i]![1]);
    }
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
