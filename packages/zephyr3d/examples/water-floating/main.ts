// Floating bodies: WaterSurfaceSampler batches height queries, FloatingBody turns them into buoyancy
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, FloatingBody, LambertMaterial, Mesh, Scene, WaterSurfaceSampler, type FBMWaveGenerator } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 6, 14), depth: -8 });
  const water = makeWater(scene);
  const waves = water.waveGenerator as FBMWaveGenerator;
  waves.amplitude = 1;

  // A lattice of height queries around the origin: one query batch serves every body
  const sampler = new WaterSurfaceSampler(water, { spacing: 2, cols: 25, rows: 25, updateHz: 30 });

  const bodies = [
    { size: 1.3, mass: 200, fraction: 0.5, x: 0, z: 0, rgb: [0.9, 0.3, 0.2] },
    { size: 1.8, mass: 400, fraction: 0.35, x: 5, z: -3, rgb: [0.95, 0.8, 0.2] },
    { size: 1, mass: 120, fraction: 0.65, x: -5, z: 2, rgb: [0.3, 0.7, 0.9] },
  ].map((b) => {
    const material = new LambertMaterial();
    material.albedoColor = new Vector4(b.rgb[0]!, b.rgb[1]!, b.rgb[2]!, 1);
    const node = new Mesh(scene, new BoxShape({ size: b.size }), material);
    const body = new FloatingBody({ node, size: new Vector3(b.size, b.size, b.size), mass: b.mass, submergedFraction: b.fraction });
    body.reset(b.x, b.z, water.position.y);
    return body;
  });

  myApp.on('tick', (deltaMs, ms) => {
    const delta = Math.min(deltaMs, 50) / 1000;
    sampler.update(delta);
    const level = water.position.y;
    for (const body of bodies) {
      // A rigid body reads the raw (un-eased) height; its own inertia does the smoothing
      body.update(delta, (x, z) => sampler.sampleWorldYRaw(x, z) - level, level);
    }
    if (stage.preview) swingCamera(camera, ms, 14, 6);
  });

  const out = stage.readout();
  if (stage.bar) {
    slider(stage.bar, 'wave amplitude', [0, 2.5, 0.05], waves.amplitude, (v) => (waves.amplitude = v));
    button(stage.bar, 'kick the bodies up', () => bodies.forEach((b) => (b.velocity.y = 5)));
    stage.every(300, () => {
      if (out) out.textContent = `sampler: ${sampler.batchSize} points per batch, ${sampler.readCount} reads, ready ${sampler.ready}\nbody 0 y = ${bodies[0]!.position.y.toFixed(2)} m`;
    });
  } else {
    stage.caption('WaterSurfaceSampler + FloatingBody: three boxes with different density');
  }
  myApp.run();
});
