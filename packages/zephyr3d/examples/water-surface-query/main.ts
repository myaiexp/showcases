// getSurfacePoint: ask the GPU for the displaced height and normal at a batch of points
import { Quaternion, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, CylinderShape, LambertMaterial, Mesh, Scene, SphereShape, type FBMWaveGenerator } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
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
  waves.amplitude = 1.1;

  // One marker per query point: a ball on the surface and a needle along the surface normal
  const ballMaterial = new LambertMaterial();
  ballMaterial.albedoColor = new Vector4(1, 0.8, 0.2, 1);
  const needleMaterial = new LambertMaterial();
  needleMaterial.albedoColor = new Vector4(0.9, 0.2, 0.3, 1);
  const query: Vector3[] = [];
  const balls: Mesh[] = [];
  const needles: Mesh[] = [];
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      query.push(new Vector3(i * 3, 0, j * 3));
      balls.push(new Mesh(scene, new SphereShape({ radius: 0.28 }), ballMaterial));
      needles.push(new Mesh(scene, new CylinderShape({ topRadius: 0.05, bottomRadius: 0.05, height: 1.2 }), needleMaterial));
    }
  }
  // The outputs are filled in place
  const positions = query.map(() => new Vector3());
  const normals = query.map(() => new Vector3());

  // The GPU feedback pass runs on the next frame, so ask once per answer rather than every frame
  let pending = false;
  const ask = async (): Promise<void> => {
    if (pending) return;
    pending = true;
    await water.getSurfacePoint(query, positions, normals);
    pending = false;
    positions.forEach((p, i) => {
      balls[i]!.position.set(p);
      const n = normals[i]!;
      needles[i]!.position.setXYZ(p.x + n.x * 0.6, p.y + n.y * 0.6, p.z + n.z * 0.6);
      needles[i]!.rotation.set(Quaternion.unitVectorToUnitVector(Vector3.axisPY(), n));
    });
  };
  myApp.on('tick', (_dt, ms) => {
    void ask();
    if (stage.preview) swingCamera(camera, ms, 14, 6);
  });

  if (stage.bar) {
    slider(stage.bar, 'wave amplitude', [0, 2.5, 0.05], waves.amplitude, (v) => (waves.amplitude = v));
    const out = stage.readout();
    stage.every(300, () => {
      if (out) out.textContent = `centre point: y = ${positions[12]!.y.toFixed(2)} m, normal (${normals[12]!.x.toFixed(2)}, ${normals[12]!.y.toFixed(2)}, ${normals[12]!.z.toFixed(2)})`;
    });
  } else {
    stage.caption('water.getSurfacePoint(points, positions, normals): 25 points, one call');
  }
  myApp.run();
});
