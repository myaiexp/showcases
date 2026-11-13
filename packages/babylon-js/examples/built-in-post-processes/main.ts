// Built-in post processes attached to a camera: black and white, blur, emboss, tonemap
import {
  ArcRotateCamera,
  BlackAndWhitePostProcess,
  BlurPostProcess,
  Color3,
  ConvolutionPostProcess,
  HemisphericLight,
  MeshBuilder,
  PointLight,
  StandardMaterial,
  TonemapPostProcess,
  TonemappingOperator,
  Vector2,
  Vector3,
} from '@babylonjs/core';
import type { PostProcess } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addButton, createPanel } from './controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  new HemisphericLight('fill', new Vector3(0, 1, 0), scene).intensity = 0.6;
  new PointLight('key', new Vector3(-4, 5, -6), scene);

  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1.6, tube: 0.5, radialSegments: 128 }, scene);
  const knotMaterial = new StandardMaterial('knotMaterial', scene);
  knotMaterial.diffuseColor = new Color3(0.9, 0.3, 0.4);
  knot.material = knotMaterial;
  const ground = MeshBuilder.CreateGround('ground', { width: 14, height: 14 }, scene);
  const groundMaterial = new StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseColor = new Color3(0.3, 0.6, 0.9);
  ground.position.y = -2.4;
  ground.material = groundMaterial;

  // Each entry builds the post processes for one effect; a blur needs a horizontal and a vertical pass.
  const EFFECTS: Record<string, () => PostProcess[]> = {
    None: () => [],
    'Black and white': () => [new BlackAndWhitePostProcess('bandw', 1.0, camera)],
    Blur: () => [
      new BlurPostProcess('blurH', new Vector2(1, 0), 24, 0.5, camera),
      new BlurPostProcess('blurV', new Vector2(0, 1), 24, 0.5, camera),
    ],
    Emboss: () => [new ConvolutionPostProcess('emboss', ConvolutionPostProcess.EmbossKernel, 1.0, camera)],
    Tonemap: () => [new TonemapPostProcess('tonemap', TonemappingOperator.Hable, 2.0, camera)],
  };
  const names = Object.keys(EFFECTS);

  let active: PostProcess[] = [];
  const select = (name: string) => {
    // detach by disposing the previous processes from the camera
    active.forEach((p) => p.dispose(camera));
    active = EFFECTS[name]?.() ?? [];
  };

  let panel: HTMLElement | undefined;
  let timer = 0;
  if (ctx.preview) {
    let index = 0;
    timer = window.setInterval(() => {
      index = (index + 1) % names.length;
      select(names[index]!);
    }, 1800);
    stage.run(() => (camera.alpha += 0.005));
  } else {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    const buttons = names.map((name) =>
      addButton(panel!, name, () => {
        select(name);
        buttons.forEach((b) => b.classList.toggle('active', b.textContent === name));
      }),
    );
    buttons[0]?.classList.add('active');
    stage.run(() => (knot.rotation.y += 0.01));
  }

  return () => {
    clearInterval(timer);
    panel?.remove();
    active.forEach((p) => p.dispose(camera));
    stage.dispose();
  };
};

export default mount;
