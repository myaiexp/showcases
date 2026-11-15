// Levels set by hand: one vertex buffer, three index ranges and Primitive.lods
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, Primitive, Scene } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { gridIndices, gridSphere, lodReport, lodRow } from '../../shared/basic-lod.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1, 1.5), Vector3.zero(), Vector3.axisPY());

  // One grid of vertices; each level is the same grid read with a larger stride
  const N = 48;
  const { positions, normals } = gridSphere(N);
  const level0 = gridIndices(N, 1);
  const level1 = gridIndices(N, 2);
  const level2 = gridIndices(N, 4);
  const allIndices = new Uint16Array([...level0, ...level1, ...level2]);

  const primitive = new Primitive();
  primitive.createAndSetVertexBuffer('position_f32x3', positions);
  primitive.createAndSetVertexBuffer('normal_f32x3', normals);
  // The index buffer holds level 0, then level 1, then level 2, back to back
  primitive.createAndSetIndexBuffer(allIndices);
  primitive.indexStart = 0;
  primitive.indexCount = level0.length;
  const levels = [
    { indexStart: level0.length, indexCount: level1.length, screenSize: 0.7, hysteresis: 0.02 },
    { indexStart: level0.length + level1.length, indexCount: level2.length, screenSize: 0.3, hysteresis: 0.02 },
  ];
  primitive.lods = levels;

  const row = lodRow(scene, primitive, lambert(0.95, 0.5, 0.4), 5, 4);
  row.forEach((m) => m.scale.setXYZ(1.5, 1.5, 1.5));
  const camera = orbitCamera(scene, new Vector3(0, 1.5, 8), 300, new Vector3(0, 0, -20));

  const out = stage.readout();
  let size1 = levels[0]!.screenSize;
  let size2 = levels[1]!.screenSize;
  const apply = (): void => {
    // `lods` goes finest to coarsest, and the switch sizes should decrease
    primitive.lods = [
      { ...levels[0]!, screenSize: Math.max(size1, size2 + 0.05) },
      { ...levels[1]!, screenSize: size2 },
    ];
  };
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      const z = 8 + 10 * (1 + Math.sin(ms * 0.0006));
      camera.lookAt(new Vector3(0, 1.5, z), new Vector3(0, 0, z - 30), Vector3.axisPY());
    }
    if (out) out.textContent = lodReport(row, camera);
  });

  if (stage.bar) {
    slider(stage.bar, 'level 1 screenSize', [0.1, 1.5, 0.05], size1, (v) => {
      size1 = v;
      apply();
    });
    slider(stage.bar, 'level 2 screenSize', [0.05, 1, 0.05], size2, (v) => {
      size2 = v;
      apply();
    });
  } else {
    stage.caption('indexStart / indexCount ranges + Primitive.lods');
  }
  myApp.run();
});
