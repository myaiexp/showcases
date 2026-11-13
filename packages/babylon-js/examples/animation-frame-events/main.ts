// AnimationEvent callbacks fired at chosen frames of a looping square path
import {
  Animation,
  AnimationEvent,
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 0.9, 13, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, -0.3), scene);

  const sphere = MeshBuilder.CreateSphere('runner', { diameter: 1 }, scene);
  const sphereMat = new StandardMaterial('runnerMat', scene);
  sphereMat.diffuseColor = new Color3(0.9, 0.9, 0.95);
  sphere.material = sphereMat;

  // Four corner pads; an event on each corner's frame lights its pad up.
  const corners = [new Vector3(-3, 0.5, -3), new Vector3(3, 0.5, -3), new Vector3(3, 0.5, 3), new Vector3(-3, 0.5, 3)];
  const glow: number[] = [0, 0, 0, 0];
  const pads = corners.map((c, i) => {
    const pad = MeshBuilder.CreateCylinder(`pad${i}`, { diameter: 1.8, height: 0.2 }, scene);
    pad.position.set(c.x, 0, c.z);
    const m = new StandardMaterial(`padMat${i}`, scene);
    m.diffuseColor = new Color3(0.2, 0.25, 0.3);
    pad.material = m;
    return m;
  });

  const log: string[] = [];
  let logEl: HTMLElement | null = null;
  const note = (text: string): void => {
    log.unshift(text);
    log.length = Math.min(log.length, 6);
    if (logEl) logEl.textContent = log.join('\n');
  };

  // Keys at every 30 frames, one per corner; the loop closes by returning to the first corner.
  const run = new Animation('run', 'position', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
  run.setKeys([...corners, corners[0]!].map((value, i) => ({ frame: i * 30, value })));

  // AnimationEvent(frame, action, onlyOnce)
  corners.forEach((_, i) => {
    run.addEvent(
      new AnimationEvent(i * 30, () => {
        glow[i] = 1;
        note(`frame ${i * 30}: corner ${i} reached`);
      }),
    );
  });
  run.addEvent(
    new AnimationEvent(
      15,
      () => {
        sphereMat.diffuseColor = new Color3(1, 0.6, 0.2);
        note('frame 15: runs once, then the event removes itself');
      },
      true,
    ),
  );

  sphere.animations.push(run);
  scene.beginAnimation(sphere, 0, 120, true);

  if (!ctx.preview) {
    logEl = document.createElement('pre');
    logEl.className = 'panel log';
    el.append(logEl);
  }

  stage.run(() => {
    const dt = stage.engine.getDeltaTime() / 1000;
    pads.forEach((m, i) => {
      glow[i] = Math.max(0, glow[i]! - dt * 1.5);
      m.emissiveColor.set(glow[i]!, glow[i]! * 0.8, 0);
    });
    if (ctx.preview) camera.alpha += 0.003;
  });
  return () => {
    logEl?.remove();
    stage.dispose();
  };
};

export default mount;
