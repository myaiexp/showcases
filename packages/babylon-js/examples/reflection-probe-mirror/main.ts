// A ReflectionProbe on a mirror sphere reflects orbiting spheres and a checkered room
import {
  ArcRotateCamera,
  Color3,
  DynamicTexture,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  ReflectionProbe,
  RenderTargetTexture,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const RATES: [string, number][] = [
  ['REFRESHRATE_RENDER_ONEVERYFRAME', RenderTargetTexture.REFRESHRATE_RENDER_ONEVERYFRAME],
  ['REFRESHRATE_RENDER_ONEVERYTWOFRAMES', RenderTargetTexture.REFRESHRATE_RENDER_ONEVERYTWOFRAMES],
  ['REFRESHRATE_RENDER_ONCE', RenderTargetTexture.REFRESHRATE_RENDER_ONCE],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, new Vector3(0, 0.5, 0), scene);
  camera.upperBetaLimit = Math.PI / 2.05;
  camera.lowerRadiusLimit = 3;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, -0.3), scene);

  // A room whose walls carry a checker pattern, so reflections show structure.
  const checker = new DynamicTexture('checker', 512, scene);
  const g = checker.getContext() as CanvasRenderingContext2D;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      g.fillStyle = (x + y) % 2 ? '#e9e4d6' : '#4a5a78';
      g.fillRect(x * 64, y * 64, 64, 64);
    }
  }
  checker.update();
  checker.wrapU = checker.wrapV = Texture.WRAP_ADDRESSMODE;
  const room = MeshBuilder.CreateBox('room', { size: 30, sideOrientation: Mesh.BACKSIDE }, scene);
  room.position.y = 14;
  const roomMat = new StandardMaterial('roomMat', scene);
  roomMat.diffuseTexture = checker;
  roomMat.specularColor = Color3.Black();
  room.material = roomMat;

  const orbiters = [0, 1, 2, 3, 4].map((i) => {
    const s = MeshBuilder.CreateSphere(`orbiter${i}`, { diameter: 1.2, segments: 16 }, scene);
    const m = new StandardMaterial(`orbiterMat${i}`, scene);
    m.diffuseColor = Color3.FromHSV(i * 70, 0.8, 1);
    s.material = m;
    return s;
  });

  const mirror = MeshBuilder.CreateSphere('mirror', { diameter: 2.4, segments: 48 }, scene);
  mirror.position.y = 1.2;
  const mirrorMat = new StandardMaterial('mirrorMat', scene);
  mirrorMat.diffuseColor = Color3.Black();
  mirrorMat.specularColor = Color3.White();
  mirror.material = mirrorMat;

  // ReflectionProbe(name, cube size, scene): renders the listed meshes into a cube texture.
  const probe = new ReflectionProbe('probe', ctx.preview ? 128 : 512, scene);
  probe.renderList!.push(room, ...orbiters);
  probe.attachToMesh(mirror); // render from the centre of the mirror sphere
  mirrorMat.reflectionTexture = probe.cubeTexture;

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const buttons = RATES.map(([name, rate], i) => {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = `probe.refreshRate = ${name}`;
      b.onclick = () => {
        probe.refreshRate = rate;
        buttons.forEach((o, j) => o.classList.toggle('on', i === j));
      };
      panel!.append(b);
      return b;
    });
    buttons[0]!.classList.add('on');
    el.append(panel);
  }

  let t = 0;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    orbiters.forEach((s, i) => {
      const a = t * (0.6 + i * 0.12) + i * 1.3;
      const r = 3.6 + (i % 2) * 1.2;
      s.position.set(Math.cos(a) * r, 1.2 + Math.sin(a * 1.7) * 0.9, Math.sin(a) * r);
    });
    if (ctx.preview) camera.alpha += 0.004;
  });
  return () => {
    panel?.remove();
    probe.dispose();
    stage.dispose();
  };
};

export default mount;
