// A skybox on a large cube whose six faces are painted on canvases, plus a sphere reflecting it
import {
  ArcRotateCamera,
  Color3,
  CubeTexture,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { paintSkyFaces } from './sky-faces.ts';
import type { SkyName } from './sky-faces.ts';
import './style.css';

const NAMES: SkyName[] = ['day', 'dusk', 'night'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', 0.2, 1.45, 7, new Vector3(0, 0.8, 0), scene);
  camera.lowerRadiusLimit = 4;
  camera.upperBetaLimit = Math.PI / 2.05;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene).intensity = 0.7;

  // The skybox: a big box seen from inside, painted with the cube texture as a pseudo-reflection.
  const skybox = MeshBuilder.CreateBox('skyBox', { size: 100 }, scene);
  const skyMat = new StandardMaterial('skyMat', scene);
  skyMat.backFaceCulling = false;
  skyMat.disableLighting = true;
  skyMat.diffuseColor = Color3.Black();
  skyMat.specularColor = Color3.Black();
  skybox.material = skyMat;
  skybox.infiniteDistance = true;
  skybox.renderingGroupId = 0; // everything else renders after it

  const ground = MeshBuilder.CreateGround('ground', { width: 14, height: 14 }, scene);
  ground.renderingGroupId = 1;
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.3, 0.38, 0.3);
  groundMat.specularColor = Color3.Black();
  ground.material = groundMat;

  const ball = MeshBuilder.CreateSphere('ball', { diameter: 2, segments: 32 }, scene);
  ball.position.y = 1;
  ball.renderingGroupId = 1;
  const ballMat = new StandardMaterial('ballMat', scene);
  ballMat.diffuseColor = Color3.Black();
  ballMat.specularColor = Color3.White();
  ball.material = ballMat;

  const faces = new Map<SkyName, string[]>();
  const show = (name: SkyName): void => {
    if (!faces.has(name)) faces.set(name, paintSkyFaces(name, ctx.preview ? 128 : 256));
    const urls = faces.get(name)!;
    skyMat.reflectionTexture?.dispose();
    ballMat.reflectionTexture?.dispose();
    // Six data-URL images in the order +x, +y, +z, -x, -y, -z; nothing is fetched.
    const sky = CubeTexture.CreateFromImages(urls, scene);
    sky.coordinatesMode = Texture.SKYBOX_MODE; // paint the cube directly instead of reflecting
    skyMat.reflectionTexture = sky;
    ballMat.reflectionTexture = CubeTexture.CreateFromImages(urls, scene); // default CUBIC_MODE: a reflection
    buttons.forEach((b, i) => b.classList.toggle('on', NAMES[i] === name));
  };

  const buttons: HTMLButtonElement[] = [];
  let panel: HTMLElement | null = null;
  let auto = true;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    NAMES.forEach((n) => {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = n;
      b.onclick = () => {
        auto = false;
        show(n);
      };
      buttons.push(b);
      panel!.append(b);
    });
    el.append(panel);
  }
  show('day');

  let t = 0;
  let current = 0;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    if (ctx.preview) camera.alpha += 0.004;
    const i = Math.floor(t / 5) % NAMES.length;
    if (auto && ctx.preview && i !== current) {
      current = i;
      show(NAMES[i]!);
    }
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
