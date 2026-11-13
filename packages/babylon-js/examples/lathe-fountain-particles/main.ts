// A CreateLathe fountain with a ParticleSystem spray you switch on and off by clicking
import {
  ArcRotateCamera,
  Color3,
  Color4,
  DynamicTexture,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  ParticleSystem,
  PointerEventTypes,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.72, 0.85, 0.95, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 3, 55, new Vector3(0, 8, 0), scene);
  camera.upperBetaLimit = Math.PI / 2.2;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene).intensity = 0.8;

  const ground = MeshBuilder.CreateGround('ground', { width: 70, height: 70 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.4, 0.62, 0.35);
  ground.material = groundMat;

  // The profile is an array of Vector3 (x = distance from the axis, y = height).
  const fountainProfile = [
    new Vector3(0, 0, 0),
    new Vector3(10, 0, 0),
    new Vector3(10, 4, 0),
    new Vector3(8, 4, 0),
    new Vector3(8, 1, 0),
    new Vector3(1, 2, 0),
    new Vector3(1, 15, 0),
    new Vector3(3, 17, 0),
  ];
  const fountain = MeshBuilder.CreateLathe(
    'fountain',
    { shape: fountainProfile, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  );
  const stone = new StandardMaterial('stone', scene);
  stone.diffuseColor = new Color3(0.62, 0.62, 0.66);
  fountain.material = stone;

  // A soft round sprite drawn on a canvas stands in for a texture file.
  const drop = new DynamicTexture('drop', 64, scene);
  const g = drop.getContext() as CanvasRenderingContext2D;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  drop.hasAlpha = true;
  drop.update();

  const particleSystem = new ParticleSystem('particles', ctx.preview ? 1500 : 5000, scene);
  particleSystem.particleTexture = drop;
  particleSystem.emitter = new Vector3(0, 17, 0); // the top of the fountain
  particleSystem.minEmitBox = new Vector3(-1, 0, 0);
  particleSystem.maxEmitBox = new Vector3(1, 0, 0);
  particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
  particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
  particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;
  particleSystem.minLifeTime = 2;
  particleSystem.maxLifeTime = 3.5;
  particleSystem.emitRate = ctx.preview ? 500 : 1500;
  particleSystem.direction1 = new Vector3(-2, 8, 2);
  particleSystem.direction2 = new Vector3(2, 8, -2);
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.025;
  particleSystem.gravity = new Vector3(0, -9.81, 0);
  particleSystem.start();

  // Click the fountain to toggle the spray (previews have no pointer input).
  let hint: HTMLElement | null = null;
  if (!ctx.preview) {
    hint = document.createElement('div');
    hint.className = 'panel';
    hint.textContent = 'Click the fountain to stop and start the spray.';
    el.append(hint);
    let on = true;
    scene.onPointerObservable.add((info) => {
      if (info.type === PointerEventTypes.POINTERDOWN && info.pickInfo?.hit && info.pickInfo.pickedMesh === fountain) {
        on = !on;
        if (on) particleSystem.start();
        else particleSystem.stop();
      }
    });
  }

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
  });
  return () => {
    hint?.remove();
    particleSystem.dispose();
    stage.dispose();
  };
};

export default mount;
