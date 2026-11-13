// Spheres sliding with different easing functions, switchable between ease in, out and in-out
import {
  Animation,
  ArcRotateCamera,
  BackEase,
  BezierCurveEase,
  BounceEase,
  CircleEase,
  Color3,
  CubicEase,
  DynamicTexture,
  EasingFunction,
  ElasticEase,
  ExponentialEase,
  HemisphericLight,
  MeshBuilder,
  PowerEase,
  QuadraticEase,
  SineEase,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const MODES = [
  ['ease in', EasingFunction.EASINGMODE_EASEIN],
  ['ease out', EasingFunction.EASINGMODE_EASEOUT],
  ['ease in-out', EasingFunction.EASINGMODE_EASEINOUT],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.0, 17, new Vector3(0, 0, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, -0.3), scene);

  const easings: [string, EasingFunction][] = [
    ['CircleEase', new CircleEase()],
    ['BackEase(1)', new BackEase(1)],
    ['BounceEase(3, 2)', new BounceEase(3, 2)],
    ['CubicEase', new CubicEase()],
    ['ElasticEase(3, 3)', new ElasticEase(3, 3)],
    ['ExponentialEase(4)', new ExponentialEase(4)],
    ['PowerEase(4)', new PowerEase(4)],
    ['QuadraticEase', new QuadraticEase()],
    ['SineEase', new SineEase()],
    ['BezierCurveEase', new BezierCurveEase(0.32, -0.73, 0.69, 1.59)],
  ];
  const rows = easings.length;
  const FPS = 30;

  easings.forEach(([name, easing], i) => {
    const z = ((rows - 1) / 2 - i) * 1.1;
    const sphere = MeshBuilder.CreateSphere(name, { diameter: 0.8, segments: 12 }, scene);
    sphere.position.set(-5, 0, z);
    const mat = new StandardMaterial(`${name}Mat`, scene);
    mat.diffuseColor = Color3.FromHSV((i / rows) * 300, 0.6, 1);
    sphere.material = mat;

    // Frame keys 0 -> 90 along x, back and forth (YOYO), shaped by the easing function.
    const slide = new Animation(`${name}Slide`, 'position.x', FPS, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_YOYO);
    slide.setKeys([
      { frame: 0, value: -5 },
      { frame: 90, value: 5 },
    ]);
    easing.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    slide.setEasingFunction(easing);
    sphere.animations.push(slide);
    scene.beginAnimation(sphere, 0, 90, true);

    // A label plane at the left edge.
    const label = MeshBuilder.CreatePlane(`${name}Label`, { width: 4, height: 0.6 }, scene);
    label.rotation.x = Math.PI / 2;
    label.position.set(-8.2, 0, z);
    const tex = new DynamicTexture(`${name}Tex`, { width: 512, height: 76 }, scene);
    tex.hasAlpha = true;
    const g = tex.getContext() as CanvasRenderingContext2D;
    g.fillStyle = '#ddd';
    g.font = '40px sans-serif';
    g.textAlign = 'right';
    g.fillText(name, 504, 52);
    tex.update();
    const lm = new StandardMaterial(`${name}LabelMat`, scene);
    lm.diffuseTexture = tex;
    lm.useAlphaFromDiffuseTexture = true;
    lm.emissiveColor = Color3.White();
    lm.disableLighting = true;
    label.material = lm;
  });

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const info = document.createElement('span');
    info.textContent = 'EasingMode:';
    panel.append(info);
    for (const [text, mode] of MODES) {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = text;
      // The easing objects are shared with the running animations, so a new mode applies at once.
      b.onclick = () => easings.forEach(([, e]) => e.setEasingMode(mode));
      panel.append(b);
    }
    el.append(panel);
  }

  stage.run();
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
