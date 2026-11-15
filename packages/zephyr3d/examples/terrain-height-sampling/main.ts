// Reading the terrain surface back: getHeightAt and getNormalAt put markers on the ground
import { Quaternion, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, LambertMaterial, Mesh, Scene, SphereShape, CylinderShape } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { buildTerrain, flyAround, loadTexture, makeSplatMap, terrainFiles } from '../../shared/env-terrain.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await terrainFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const world = buildTerrain(scene, { size: 128, tile: 32, heightScale: 24 });
  const { terrain } = world;
  const material = terrain.material!;
  material.numDetailMaps = 3;
  material.setDetailMap(0, await loadTexture('/terrain/grass.png'));
  material.setDetailMap(1, await loadTexture('/terrain/rock.png'));
  material.setDetailMap(2, await loadTexture('/terrain/sand.png'));
  [20, 12, 30].forEach((s, i) => material.setDetailMapUVScale(i, s));
  material.setSplatMap(makeSplatMap());

  // The CPU copy of the heights is known after an edit's read back lands
  await terrain.whenHeightDataReady();

  // Walkers follow a loop across the terrain, standing on the surface with their axis along its normal
  const ballMaterial = new LambertMaterial();
  ballMaterial.albedoColor = new Vector4(1, 0.35, 0.2, 1);
  const needleMaterial = new LambertMaterial();
  needleMaterial.albedoColor = new Vector4(0.2, 0.8, 1, 1);
  const walkers = [0, 1, 2, 3].map((i) => ({
    ball: new Mesh(scene, new SphereShape({ radius: 1.2 }), ballMaterial),
    needle: new Mesh(scene, new CylinderShape({ topRadius: 0.12, bottomRadius: 0.12, height: 4 }), needleMaterial),
    phase: i * 1.57,
  }));
  let speed = 0.0004;
  let clock = 0;
  const readout = { y: 0, ny: 0 };
  myApp.on('tick', (dt, ms) => {
    clock += dt * speed;
    for (const w of walkers) {
      const a = clock + w.phase;
      const x = Math.cos(a) * 34 + Math.cos(a * 3) * 8;
      const z = Math.sin(a) * 34 + Math.sin(a * 2) * 10;
      const y = terrain.getHeightAt(x, z);
      const n = terrain.getNormalAt(x, z);
      if (y === null || n === null) continue;
      w.ball.position.setXYZ(x, y + 1.2, z);
      w.needle.position.setXYZ(x + n.x * 3, y + n.y * 3, z + n.z * 3);
      w.needle.rotation.set(Quaternion.unitVectorToUnitVector(Vector3.axisPY(), n));
      readout.y = y;
      readout.ny = n.y;
    }
    if (stage.preview) flyAround(world, ms);
  });
  const out = stage.readout();
  if (stage.bar) {
    slider(stage.bar, 'speed', [0, 0.002, 0.0001], speed, (v) => (speed = v));
    stage.every(250, () => {
      if (out) out.textContent = `getHeightAt = ${readout.y.toFixed(2)} m, getNormalAt.y = ${readout.ny.toFixed(2)} (1 is flat)`;
    });
  } else {
    stage.caption('terrain.getHeightAt / getNormalAt under four walkers');
  }
  myApp.run();
});
