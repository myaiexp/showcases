// Particle attractors: an orbiting attractor pulls, a repulsor pushes
import {
  ArcRotateCamera,
  Attractor,
  Color3,
  Color4,
  MeshBuilder,
  ParticleSystem,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createFlareTexture } from '../../shared/flare.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor = new Color4(0.02, 0.02, 0.05, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 14, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);

  const system = new ParticleSystem('stream', ctx.preview ? 1500 : 5000, scene);
  system.particleTexture = createFlareTexture(scene);
  system.blendMode = ParticleSystem.BLENDMODE_ADD;
  system.emitter = new Vector3(-5, 0, 0);
  system.createPointEmitter(new Vector3(0.6, -0.2, -0.2), new Vector3(1, 0.2, 0.2));
  system.emitRate = ctx.preview ? 400 : 1200;
  system.minLifeTime = system.maxLifeTime = 4;
  system.minEmitPower = 2;
  system.maxEmitPower = 3;
  system.minSize = 0.08;
  system.maxSize = 0.2;
  system.color1 = new Color4(1, 0.7, 0.3, 1);
  system.color2 = new Color4(1, 0.3, 0.5, 1);
  system.colorDead = new Color4(0.2, 0, 0.4, 0);

  // An attractor is a position and a strength; a negative strength repels.
  const attractor = new Attractor();
  attractor.strength = 2;
  attractor.position = new Vector3(0, 1, -1);
  system.addAttractor(attractor);
  const repulsor = new Attractor();
  repulsor.strength = -3;
  repulsor.position = new Vector3(2, -1.5, 0);
  system.addAttractor(repulsor);
  system.start();

  // Markers for where the two are.
  const marker = (color: Color3, pos: Vector3) => {
    const m = MeshBuilder.CreateSphere('marker', { diameter: 0.3 }, scene);
    const mat = new StandardMaterial('marker', scene);
    mat.emissiveColor = color;
    mat.disableLighting = true;
    m.material = mat;
    m.position = pos;
    return m;
  };
  marker(new Color3(0.3, 1, 0.5), attractor.position);
  marker(new Color3(1, 0.3, 0.3), repulsor.position);

  let orbit = true;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('attractor.strength', -5, 8, 0.1, attractor.strength, (v) => (attractor.strength = v));
    panel.slider('repulsor.strength', -8, 5, 0.1, repulsor.strength, (v) => (repulsor.strength = v));
    panel.check('orbit the attractor', orbit, (on) => (orbit = on));
    panel.check('repulsor attached (addAttractor / removeAttractor)', true, (on) =>
      on ? system.addAttractor(repulsor) : system.removeAttractor(repulsor),
    );
  }

  let t = 0;
  stage.run(() => {
    t += scene.getEngine().getDeltaTime() / 1000;
    // The position can change at any time; the marker shares the same Vector3.
    if (orbit) attractor.position.set(Math.cos(t * 0.8) * 2.5, 1 + Math.sin(t * 1.3), Math.sin(t * 0.8) * 2.5);
  });

  return () => {
    system.dispose();
    stage.dispose();
  };
};

export default mount;
