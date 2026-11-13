// Two AnimationGroups on one sphere, blended with group.weight and sped up with speedRatio
import {
  Animation,
  AnimationGroup,
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from './controls.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 12, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 0.5, -1), scene);

  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);
  const mat = new StandardMaterial('mat', scene);
  mat.diffuseColor = new Color3(1, 0.7, 0.2);
  sphere.material = mat;
  // Guides along the two axes the groups move on.
  for (const pts of [[new Vector3(-3, 0, 0), new Vector3(3, 0, 0)], [new Vector3(0, -3, 0), new Vector3(0, 3, 0)]]) {
    MeshBuilder.CreateLines('guide', { points: pts }, scene).color = new Color3(0.4, 0.45, 0.55);
  }

  // Each animation moves the sphere's position along one axis.
  const makeMove = (name: string, to: Vector3): Animation => {
    const a = new Animation(name, 'position', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
    a.setKeys([
      { frame: 0, value: to.negate() },
      { frame: 30, value: to },
      { frame: 60, value: to.negate() },
    ]);
    return a;
  };
  const horizontal = new AnimationGroup('horizontal', scene);
  horizontal.addTargetedAnimation(makeMove('moveX', new Vector3(3, 0, 0)), sphere);
  const vertical = new AnimationGroup('vertical', scene);
  vertical.addTargetedAnimation(makeMove('moveY', new Vector3(0, 3, 0)), sphere);
  // normalize makes both groups span the same frame range.
  horizontal.normalize(0, 60);
  vertical.normalize(0, 60);

  // A weight other than the default -1 switches on the weighted (blended) mode.
  horizontal.weight = 1;
  vertical.weight = 0.5;
  horizontal.start(true, 1);
  vertical.start(true, 1);

  let panel: HTMLElement | null = null;
  let auto = ctx.preview;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel sliders';
    panel.append(
      slider('horizontal.weight', 0, 1, 1, (v) => (horizontal.weight = v)).row,
      slider('vertical.weight', 0, 1, 0.5, (v) => (vertical.weight = v)).row,
      slider('horizontal.speedRatio', 0.25, 3, 1, (v) => (horizontal.speedRatio = v)).row,
      slider('vertical.speedRatio', 0.25, 3, 1, (v) => (vertical.speedRatio = v)).row,
    );
    el.append(panel);
  }

  let t = 0;
  stage.run(() => {
    if (!auto) return;
    t += stage.engine.getDeltaTime() / 1000;
    horizontal.weight = 0.5 + 0.5 * Math.sin(t);
    vertical.weight = 0.5 + 0.5 * Math.cos(t * 0.7);
    vertical.speedRatio = 1.5;
  });
  return () => {
    auto = false;
    panel?.remove();
    horizontal.dispose();
    vertical.dispose();
    stage.dispose();
  };
};

export default mount;
