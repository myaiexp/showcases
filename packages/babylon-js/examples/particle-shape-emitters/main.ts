// Particle shape emitters: point, box, sphere, cone and cylinder regions for the same system
import { ArcRotateCamera, Color4, ParticleSystem, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addButton, createPanel } from './controls.ts';
import { createFlareTexture } from './flare.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2.3, Math.PI / 2.5, 12, Vector3.Zero(), scene);
  scene.clearColor = new Color4(0.03, 0.03, 0.06, 1);

  const system = new ParticleSystem('shape', ctx.preview ? 600 : 2500, scene);
  system.particleTexture = createFlareTexture(scene);
  system.emitter = Vector3.Zero();
  system.blendMode = ParticleSystem.BLENDMODE_ADD;
  system.emitRate = ctx.preview ? 200 : 600;
  system.minLifeTime = 1;
  system.maxLifeTime = 1.8;
  system.minSize = 0.12;
  system.maxSize = 0.3;
  system.minEmitPower = 0.6;
  system.maxEmitPower = 1.6;
  system.color1 = new Color4(0.4, 0.8, 1, 1);
  system.color2 = new Color4(0.9, 0.4, 1, 1);
  system.colorDead = new Color4(0, 0, 0.2, 0);

  // Each create*Emitter call swaps the region particles are born in.
  const SHAPES: Record<string, () => void> = {
    Point: () => system.createPointEmitter(new Vector3(-2, 3, -1), new Vector3(2, 3, 1)),
    Box: () => system.createBoxEmitter(new Vector3(-1, 1, 0), new Vector3(1, 1, 0), new Vector3(-2, -1, -2), new Vector3(2, 1, 2)),
    Sphere: () => system.createSphereEmitter(2),
    Hemisphere: () => system.createHemisphericEmitter(2),
    Cone: () => system.createConeEmitter(1.6, Math.PI / 4),
    Cylinder: () => system.createCylinderEmitter(1.6, 3, 1, 0),
  };
  const names = Object.keys(SHAPES);
  const apply = (name: string) => SHAPES[name]?.();
  apply('Sphere');
  system.start();

  let panel: HTMLElement | undefined;
  let timer = 0;
  if (ctx.preview) {
    let index = 2;
    timer = window.setInterval(() => {
      index = (index + 1) % names.length;
      apply(names[index]!);
    }, 2200);
    stage.run(() => (camera.alpha += 0.004));
  } else {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    const buttons = names.map((name) =>
      addButton(panel!, name, () => {
        apply(name);
        buttons.forEach((b) => b.classList.toggle('active', b.textContent === name));
      }),
    );
    buttons[2]?.classList.add('active');
    stage.run();
  }

  return () => {
    clearInterval(timer);
    panel?.remove();
    system.stop();
    system.dispose();
    stage.dispose();
  };
};

export default mount;
