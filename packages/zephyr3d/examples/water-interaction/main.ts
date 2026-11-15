// WaterInteraction: ripples from a dropped stone, the wake of a moving hull, a blocking piling
import { Vector2, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, LambertMaterial, Mesh, Scene, WaterDisturber, WaterInteraction, type FBMWaveGenerator } from '@zephyr3d/scene';
import { button, slider, toggle } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera, pilings } = await buildWorld(scene, { eye: new Vector3(0, 9, 16), depth: -6, target: new Vector3(0, 0, 0) });
  const water = makeWater(scene);
  // Calm the open sea so the ripples read
  (water.waveGenerator as FBMWaveGenerator).amplitude = 0.15;

  const interaction = new WaterInteraction();
  interaction.windowSize = 40; // metres covered by the field
  interaction.resolution = stage.preview ? 256 : 512; // texels per side
  interaction.waveSpeed = 1.5; // m/s, clamped to what the grid can integrate stably
  interaction.damping = 0.4; // 1/s
  // A pond: the window stays put instead of following the camera
  interaction.followMode = 'fixed';
  interaction.center = new Vector2(0, 0);
  water.interaction = interaction;

  // A hull: a box followed by a disturber, driven round in a circle
  const hullMaterial = new LambertMaterial();
  hullMaterial.albedoColor = new Vector4(0.8, 0.25, 0.2, 1);
  const hullNode = new Mesh(scene, new BoxShape({ sizeX: 1.6, sizeY: 0.7, sizeZ: 3.6 }), hullMaterial);
  const hull = new WaterDisturber(hullNode, 'box');
  hull.size = new Vector3(1.6, 1, 3.6);
  hull.strength = 0.15;
  interaction.addDisturber(hull);

  // A piling: waves stop at it and reflect
  const piling = new WaterDisturber(pilings[0]!, 'capsule');
  piling.radius = 0.35;
  piling.halfLength = 6;
  piling.blocking = true;
  interaction.addDisturber(piling);

  const stones = [
    [-4, -4],
    [5, -2],
    [-2, 5],
    [4, 4],
    [0, -6],
  ] as const;
  const drop = (i: number): void => {
    const [x, z] = stones[i % stones.length]!;
    // One impulse: negative pushes the surface down
    interaction.addImpulse(x, z, 1, -0.25);
  };

  let hullOn = true;
  myApp.on('tick', (_dt, ms) => {
    if (hullOn) {
      const a = ms * 0.0006;
      hullNode.position.setXYZ(Math.cos(a) * 8, 0.1, Math.sin(a) * 8);
      hullNode.rotation.fromAxisAngle(Vector3.axisPY(), -a);
    }
    if (stage.preview) swingCamera(camera, ms, 16, 9, new Vector3(0, 0, 0));
  });
  stage.every(1500, (i) => drop(i));

  const out = stage.readout();
  if (stage.bar) {
    button(stage.bar, 'drop a stone', () => drop(Math.floor(Math.random() * stones.length)));
    toggle(stage.bar, 'hull moving', true, (v) => (hullOn = v));
    toggle(stage.bar, 'piling blocks waves', true, (v) => (piling.blocking = v));
    slider(stage.bar, 'waveSpeed', [0.5, 4, 0.1], 1.5, (v) => (interaction.waveSpeed = v));
    slider(stage.bar, 'damping', [0, 3, 0.1], 0.4, (v) => (interaction.damping = v));
    slider(stage.bar, 'foamAmount', [0, 1, 0.05], interaction.foamAmount, (v) => (interaction.foamAmount = v));
    toggle(stage.bar, "debugOutput 'interaction'", false, (v) => (water.debugOutput = v ? 'interaction' : 'none'));
    if (out) out.textContent = `isOk() ${interaction.isOk()} (false: no filterable float render target, the water uses the wave generator alone)\nmax wave speed ${interaction.maxWaveSpeed.toFixed(2)} m/s, texel ${(interaction.texelSize * 100).toFixed(1)} cm`;
  } else {
    stage.caption('addImpulse stones, a moving WaterDisturber hull, a blocking piling');
  }
  myApp.run();
});
