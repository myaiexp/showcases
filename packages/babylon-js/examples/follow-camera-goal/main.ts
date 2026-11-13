// A FollowCamera chasing a lapping car, with its goal position (radius, height, rotation) adjustable
import {
  Color3,
  FollowCamera,
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
  scene.clearColor.set(0.72, 0.85, 0.95, 1);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);

  const ground = MeshBuilder.CreateGround('ground', { width: 80, height: 80 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.4, 0.62, 0.35);
  ground.material = groundMat;
  // Posts around the track give the moving camera something to pass.
  const postMat = new StandardMaterial('postMat', scene);
  postMat.diffuseColor = new Color3(0.8, 0.35, 0.25);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const r = i % 2 ? 24 : 17;
    const post = MeshBuilder.CreateCylinder(`post${i}`, { diameter: 1, height: 4, tessellation: 8 }, scene);
    post.position.set(Math.cos(a) * r, 2, Math.sin(a) * r);
    post.material = postMat;
  }

  // The target: a box car with a nose cone, driven round a circle of radius 10.
  const car = MeshBuilder.CreateBox('car', { width: 1.4, height: 0.8, depth: 2.4 }, scene);
  const carMat = new StandardMaterial('carMat', scene);
  carMat.diffuseColor = new Color3(0.2, 0.4, 0.9);
  car.material = carMat;
  car.position.y = 0.5;
  const nose = MeshBuilder.CreateBox('nose', { width: 0.8, height: 0.5, depth: 0.8 }, scene);
  nose.parent = car;
  nose.position.set(0, 0, 1.4);
  nose.material = postMat;

  // FollowCamera(name, start position, scene); the goal is radius, heightOffset and rotationOffset.
  const camera = new FollowCamera('followCam', new Vector3(0, 8, -20), scene);
  camera.radius = 12;
  camera.heightOffset = 5;
  camera.rotationOffset = 180; // behind the car, in degrees
  camera.cameraAcceleration = 0.02;
  camera.maxCameraSpeed = 10;
  camera.lockedTarget = car;
  if (!ctx.preview) camera.attachControl(true);

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel sliders';
    panel.append(
      slider('radius', 2, 30, camera.radius, (v) => (camera.radius = v), 1).row,
      slider('heightOffset', 0, 20, camera.heightOffset, (v) => (camera.heightOffset = v), 0.5).row,
      slider('rotationOffset', 0, 360, camera.rotationOffset, (v) => (camera.rotationOffset = v), 5).row,
      slider('cameraAcceleration', 0.002, 0.2, camera.cameraAcceleration, (v) => (camera.cameraAcceleration = v), 0.002).row,
      slider('maxCameraSpeed', 1, 30, camera.maxCameraSpeed, (v) => (camera.maxCameraSpeed = v), 1).row,
    );
    el.append(panel);
  }

  let t = 0;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    const a = t * 0.5;
    car.position.set(Math.cos(a) * 10, 0.5, Math.sin(a) * 10);
    car.rotation.y = -a; // tangent of the circle, nose forward
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
