// MotionBlurPostProcess: fast-moving objects smear along their velocity
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  MotionBlurPostProcess,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 14, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.3), scene);
  MeshBuilder.CreateGround('ground', { width: 16, height: 16 }, scene);

  // A spinning fan and a ball on a fast loop: rotation and position both make velocity.
  const fan = MeshBuilder.CreateBox('fan', { width: 6, height: 0.5, depth: 0.3 }, scene);
  fan.position.set(-3, 3, 0);
  const ball = MeshBuilder.CreateSphere('ball', { diameter: 1.2 }, scene);
  const still = MeshBuilder.CreateBox('still', { size: 1.5 }, scene);
  still.position.set(4, 0.75, 2);
  [fan, ball, still].forEach((m, i) => {
    const mat = new StandardMaterial(m.name, scene);
    mat.diffuseColor = Color3.FromHSV(i * 120 + 20, 0.7, 1);
    m.material = mat;
  });

  const motionblur = new MotionBlurPostProcess('mb', scene, 1.0, camera);
  motionblur.motionStrength = 2;

  let speed = 1;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('motionStrength', 0, 5, 0.1, motionblur.motionStrength, (v) => (motionblur.motionStrength = v));
    panel.slider('motionBlurSamples', 4, 64, 4, motionblur.motionBlurSamples, (v) => (motionblur.motionBlurSamples = v));
    panel.slider('object speed', 0, 3, 0.1, speed, (v) => (speed = v));
    // Screen-based mode blurs by camera motion only: orbit the camera to see it.
    panel.check('isObjectBased', true, (on) => (motionblur.isObjectBased = on));
  }

  let t = 0;
  stage.run(() => {
    const dt = (scene.getEngine().getDeltaTime() / 1000) * speed;
    t += dt;
    fan.rotation.z += dt * 12;
    ball.position.set(Math.cos(t * 4) * 4, 1 + Math.abs(Math.sin(t * 8)) * 2, Math.sin(t * 4) * 4);
  });

  return () => {
    motionblur.dispose(camera);
    stage.dispose();
  };
};

export default mount;
