// PointLight, DirectionalLight, SpotLight and HemisphericLight, each lighting its own sphere
import {
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  HemisphericLight,
  Light,
  MeshBuilder,
  PointLight,
  SpotLight,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { AbstractMesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { makeLabel } from './labels.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.06, 0.07, 0.09, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.0, 19, new Vector3(0, 0.5, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);

  const stone = new StandardMaterial('stone', scene);
  stone.diffuseColor = new Color3(0.85, 0.85, 0.85);
  stone.specularColor = Color3.White();
  stone.specularPower = 48;

  // One station per light: a tile, a sphere and a cube. Each light lights only its own station.
  const station = (x: number): AbstractMesh[] => {
    const tile = MeshBuilder.CreateGround(`tile${x}`, { width: 4.6, height: 4.6 }, scene);
    const ball = MeshBuilder.CreateSphere(`ball${x}`, { diameter: 1.8, segments: 32 }, scene);
    const cube = MeshBuilder.CreateBox(`cube${x}`, { size: 1 }, scene);
    for (const m of [tile, ball, cube]) {
      m.material = stone;
      m.position.x = x;
    }
    ball.position.set(x - 0.7, 0.9, 0);
    cube.position.set(x + 1.3, 0.5, 0.9);
    return [tile, ball, cube];
  };
  const xs = [-7.5, -2.5, 2.5, 7.5];
  const sets = xs.map(station);

  // PointLight(name, position, scene): light in every direction from one point.
  const point = new PointLight('point', new Vector3(xs[0]! + 0.5, 3, -1.5), scene);
  point.diffuse = new Color3(1, 0.55, 0.2);
  // DirectionalLight(name, direction, scene): parallel rays with infinite range.
  const directional = new DirectionalLight('directional', new Vector3(-0.6, -1, 0.6), scene);
  directional.diffuse = new Color3(1, 1, 0.9);
  // SpotLight(name, position, direction, angle, exponent, scene): a cone of light.
  const spot = new SpotLight('spot', new Vector3(xs[2]!, 5, -1), new Vector3(0, -1, 0.15), Math.PI / 3, 2, scene);
  spot.diffuse = new Color3(0.4, 0.8, 1);
  // HemisphericLight(name, direction, scene): ambient; groundColor lights from the opposite side.
  const hemi = new HemisphericLight('hemi', new Vector3(0, 1, 0), scene);
  hemi.diffuse = new Color3(0.9, 0.9, 1);
  hemi.groundColor = new Color3(0.8, 0.2, 0.6);
  const lights: [string, Light][] = [
    ['PointLight', point],
    ['DirectionalLight', directional],
    ['SpotLight', spot],
    ['HemisphericLight', hemi],
  ];
  lights.forEach(([name, light], i) => {
    light.includedOnlyMeshes = sets[i]!;
    const label = makeLabel(scene, name, 4.4);
    label.position.set(xs[i]!, 0.01, 3.1);
    label.rotation.x = Math.PI / 2;
  });

  // Small bulbs mark where the point and spot lights sit.
  for (const l of [point, spot]) {
    const bulb = MeshBuilder.CreateSphere(`${l.name}Bulb`, { diameter: 0.3 }, scene);
    const m = new StandardMaterial(`${l.name}BulbMat`, scene);
    m.emissiveColor = l.diffuse;
    m.disableLighting = true;
    bulb.material = m;
    bulb.position = (l as PointLight | SpotLight).position;
  }

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    for (const [name, light] of lights) {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = `${name}.setEnabled(false)`;
      let on = true;
      b.onclick = () => {
        on = !on;
        light.setEnabled(on);
        b.textContent = `${name}.setEnabled(${on})`;
      };
      panel.append(b);
    }
    el.append(panel);
  }

  let t = 0;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    // The point light circles its station and the spot sweeps side to side.
    point.position.x = xs[0]! + Math.cos(t) * 1.8;
    point.position.z = Math.sin(t) * 1.8;
    spot.direction.x = Math.sin(t * 0.8) * 0.5;
    directional.direction.x = -0.6 + Math.sin(t * 0.5) * 0.8;
    if (ctx.preview) camera.alpha = -Math.PI / 2 + Math.sin(t * 0.3) * 0.25;
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
