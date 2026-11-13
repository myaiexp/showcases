// One SpotLight and ShadowGenerator, switched between hard, Poisson, ESM, blur, PCF and PCSS filtering
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  ShadowGenerator,
  SpotLight,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { makeChangingLabel } from './label.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.0, 15, new Vector3(0, 1, 0), scene);
  camera.upperBetaLimit = Math.PI / 2.1;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('ambient', new Vector3(0, 1, 0), scene).intensity = 0.25;

  const light = new SpotLight('spot', new Vector3(-3, 9, -4), new Vector3(0.3, -1, 0.4), 1.0, 8, scene);
  light.intensity = 1.2;
  // A tight depth range helps the exponential, close-exponential and PCSS filters.
  light.shadowMinZ = 4;
  light.shadowMaxZ = 20;

  const ground = MeshBuilder.CreateGround('ground', { width: 16, height: 16 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.8, 0.82, 0.85);
  groundMat.specularColor = Color3.Black();
  ground.material = groundMat;
  ground.receiveShadows = true;

  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 0.9, tube: 0.3, radialSegments: 80 }, scene);
  knot.position.set(-1.5, 2.2, 0);
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1.6 }, scene);
  sphere.position.set(2.2, 0.8, 0.5);
  const post = MeshBuilder.CreateBox('post', { width: 0.4, height: 3, depth: 0.4 }, scene);
  post.position.set(0.5, 1.5, 2);
  for (const m of [knot, sphere, post]) {
    const mat = new StandardMaterial(`${m.name}Mat`, scene);
    mat.diffuseColor = new Color3(0.95, 0.5, 0.2);
    m.material = mat;
  }

  const shadowGenerator = new ShadowGenerator(1024, light);
  shadowGenerator.addShadowCaster(knot);
  shadowGenerator.addShadowCaster(sphere);
  shadowGenerator.addShadowCaster(post);
  shadowGenerator.bias = 0.0005;

  // Each filter is one flag on the generator; turning one on replaces the previous one.
  const modes: [string, () => void][] = [
    ['No filter', () => (shadowGenerator.filter = ShadowGenerator.FILTER_NONE)],
    ['Poisson sampling', () => (shadowGenerator.usePoissonSampling = true)],
    ['Exponential shadow map', () => (shadowGenerator.useExponentialShadowMap = true)],
    ['Blur exponential', () => (shadowGenerator.useBlurExponentialShadowMap = true)],
    ['Close exponential', () => (shadowGenerator.useCloseExponentialShadowMap = true)],
    ['PCF', () => (shadowGenerator.usePercentageCloserFiltering = true)],
    ['PCSS contact hardening', () => (shadowGenerator.useContactHardeningShadow = true)],
  ];
  const label = makeChangingLabel(scene, 8);
  label.mesh.position.set(0, 0.02, -6);
  label.mesh.rotation.x = Math.PI / 2;
  const apply = (i: number): void => {
    modes[i]![1]();
    label.set(modes[i]![0]);
    buttons.forEach((b, j) => b.classList.toggle('on', j === i));
  };

  const buttons: HTMLButtonElement[] = [];
  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    modes.forEach(([name], i) => {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = name;
      b.onclick = () => {
        auto = false;
        apply(i);
      };
      buttons.push(b);
      panel!.append(b);
    });
    el.append(panel);
  }

  let auto = true;
  let t = 0;
  let current = -1;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    knot.rotation.y = t * 0.6;
    knot.position.y = 2.2 + Math.sin(t) * 0.4;
    // Previews and an untouched full view step through the modes by themselves.
    const i = Math.floor(t / 2.5) % modes.length;
    if (auto && i !== current) {
      current = i;
      apply(i);
    }
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
