// A second orthographic camera, limited by layerMask, draws a crosshair over the main view
import {
  ArcRotateCamera,
  Camera,
  Color3,
  FreeCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const SIGHT_MASK = 0x20000000;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas, engine } = stage;
  scene.clearColor.set(0.72, 0.85, 0.95, 1);
  const main = new ArcRotateCamera('main', -Math.PI / 2, Math.PI / 2.6, 14, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) main.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);

  const ground = MeshBuilder.CreateGround('ground', { width: 30, height: 30 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.4, 0.6, 0.35);
  ground.material = groundMat;
  const targets = [-4, 0, 4].map((x, i) => {
    const s = MeshBuilder.CreateSphere(`target${i}`, { diameter: 2 }, scene);
    s.position.set(x, 1, i === 1 ? 2 : 0);
    return s;
  });

  // The second camera sees only meshes whose layerMask shares a bit with its own.
  scene.activeCameras = [main];
  const sightCamera = new FreeCamera('sightCamera', new Vector3(0, 0, -50), scene);
  sightCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
  sightCamera.layerMask = SIGHT_MASK;
  scene.activeCameras.push(sightCamera);
  // Keep the scene's lights off the crosshair.
  for (let i = scene.lights.length - 1; i >= 0; i--) scene.lights[i]!.excludeWithLayerMask = SIGHT_MASK;

  const sightMat = new StandardMaterial('sightMat', scene);
  sightMat.emissiveColor = new Color3(0, 1, 0);
  sightMat.disableLighting = true;

  // Orthographic units are pixels here, so the sight is sized from the render height.
  let sight: Mesh | null = null;
  let visible = true;
  const buildSight = (): void => {
    sight?.dispose();
    const h = Math.min(engine.getRenderHeight(), engine.getRenderWidth()) * 0.8;
    const bar = (name: string, w: number, hh: number, x: number, y: number): Mesh => {
      const b = MeshBuilder.CreateBox(name, { width: w, height: hh, depth: 1 }, scene);
      b.position.set(x, y, 0);
      return b;
    };
    const t = Math.max(2, h * 0.01);
    sight = Mesh.MergeMeshes(
      [
        bar('v', t, h * 0.2, 0, 0),
        bar('hz', h * 0.2, t, 0, 0),
        bar('top', h, t, 0, h / 2),
        bar('bottom', h, t, 0, -h / 2),
        bar('left', t, h, -h / 2, 0),
        bar('right', t, h, h / 2, 0),
      ],
      true,
    )!;
    sight.name = 'gunSight';
    sight.material = sightMat;
    sight.layerMask = visible ? SIGHT_MASK : 0; // a layerMask of 0 is seen by no camera
  };
  buildSight();
  const resizeObserver = engine.onResizeObservable.add(buildSight);

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const b = document.createElement('button');
    b.classList.add('btn');
    const label = (): string => `Crosshair layerMask: ${visible ? '0x20000000' : '0'}`;
    b.textContent = label();
    b.onclick = () => {
      visible = !visible;
      sight!.layerMask = visible ? SIGHT_MASK : 0;
      b.textContent = label();
    };
    panel.append(b);
    el.append(panel);
  }

  let t = 0;
  stage.run(() => {
    t += engine.getDeltaTime() / 1000;
    targets.forEach((s, i) => (s.position.y = 1 + Math.abs(Math.sin(t * 2 + i))));
    if (ctx.preview) main.alpha += 0.004;
  });
  return () => {
    engine.onResizeObservable.remove(resizeObserver);
    panel?.remove();
    scene.activeCameras = [];
    stage.dispose();
  };
};

export default mount;
