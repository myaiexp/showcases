// Extruded street lamps, each with a SpotLight, fading from day to night
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  SpotLight,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2.3, Math.PI / 3, 20, new Vector3(0, 1, 0), scene);
  camera.upperBetaLimit = Math.PI / 2.1;
  if (!ctx.preview) camera.attachControl(canvas, true);

  const sky = new HemisphericLight('sky', new Vector3(0, 1, 0), scene);
  sky.intensity = 0.5;

  // Lights are limited to four per material by default; this raises it for the ground.
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.55, 0.65, 0.5);
  groundMat.specularColor = Color3.Black();
  groundMat.maxSimultaneousLights = 6;
  const ground = MeshBuilder.CreateGround('ground', { width: 24, height: 24 }, scene);
  ground.material = groundMat;

  // The shape outline (x, y plane only) is extruded along a path that bends over at the top.
  const lampShape: Vector3[] = [];
  for (let i = 0; i < 20; i++) {
    lampShape.push(new Vector3(Math.cos((i * Math.PI) / 10), Math.sin((i * Math.PI) / 10), 0));
  }
  lampShape.push(lampShape[0]!); // close the shape
  const lampPath: Vector3[] = [new Vector3(0, 0, 0), new Vector3(0, 10, 0)];
  for (let i = 0; i < 20; i++) {
    lampPath.push(
      new Vector3(1 + Math.cos(Math.PI - (i * Math.PI) / 40), 10 + Math.sin(Math.PI - (i * Math.PI) / 40), 0),
    );
  }
  lampPath.push(new Vector3(3, 11, 0));
  const lamp = MeshBuilder.ExtrudeShape(
    'lamp',
    { cap: Mesh.CAP_END, shape: lampShape, path: lampPath, scale: 0.5 },
    scene,
  );
  const iron = new StandardMaterial('iron', scene);
  iron.diffuseColor = new Color3(0.15, 0.15, 0.18);
  lamp.material = iron;
  const S = 0.45;
  lamp.scaling.setAll(S);

  const lights: SpotLight[] = [];
  const zs = [-8, -2.7, 2.7, 8];
  zs.forEach((z, i) => {
    const post = i === 0 ? lamp : lamp.clone(`lamp${i}`);
    post.position.set(-4, 0, z);
    // SpotLight(name, position, direction, angle of spread, falloff exponent)
    const spot = new SpotLight(`spot${i}`, new Vector3(-4 + 3 * S, 10.8 * S, z), new Vector3(0, -1, 0), 1.2, 6, scene);
    spot.diffuse = Color3.Yellow();
    spot.intensity = 6;
    lights.push(spot);
  });

  // A few boxes to catch the light.
  for (const [x, z] of [[1, -5], [4, 0], [0, 5], [6, 6]] as const) {
    const b = MeshBuilder.CreateBox(`block${x}`, { size: 1.6 }, scene);
    b.position.set(x, 0.8, z);
  }

  // day: 1 = full daylight, 0 = night.
  const setDay = (day: number): void => {
    sky.intensity = 0.08 + 0.6 * day;
    scene.clearColor.set(0.04 + 0.68 * day, 0.05 + 0.8 * day, 0.12 + 0.83 * day, 1);
  };

  let slider: HTMLInputElement | null = null;
  let panel: HTMLElement | null = null;
  let manual = 0.15; // 0 = night, 1 = day
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    panel.append('Night');
    slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = String(manual);
    slider.oninput = () => (manual = Number(slider!.value));
    panel.append(slider, 'Day');
    el.append(panel);
  }

  let t = 0;
  stage.run(() => {
    if (ctx.preview) {
      t += stage.engine.getDeltaTime() / 1000;
      camera.alpha += 0.004;
      setDay(Math.min(1, Math.max(0, 0.5 + 0.7 * Math.cos(t * 0.6))));
    } else {
      setDay(manual);
    }
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
