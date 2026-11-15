// Raw files through the VFS: fetchTextData, fetchJsonData and fetchBinaryData build a scene
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, DirectionalLight, getEngine, Mesh, Primitive, Scene, UnlitMaterial } from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';
import { memoryFiles } from '../../shared/vfs.ts';

interface Level {
  title: string;
  boxes: { x: number; z: number; size: number; color: [number, number, number] }[];
}

const LEVEL: Level = {
  title: 'level one',
  boxes: [
    { x: -4, z: 0, size: 2, color: [1, 0.4, 0.3] },
    { x: 0, z: -3, size: 3, color: [0.4, 0.9, 0.5] },
    { x: 4, z: 1, size: 1.5, color: [0.4, 0.6, 1] },
  ],
};

export default zephyrExample(import.meta.url, async (stage) => {
  // A float32 triangle fan for the binary file: a ring of 12 triangles (x, y, z per vertex)
  const ring = new Float32Array(13 * 3);
  for (let i = 0; i < 12; i++) ring.set([Math.cos((i / 12) * Math.PI * 2) * 2, 0, Math.sin((i / 12) * Math.PI * 2) * 2], (i + 1) * 3);
  const VFS = await memoryFiles({
    '/config/level.json': JSON.stringify(LEVEL),
    '/shaders/custom.txt': '// kept next to the engine assets\nvec3 tint(vec3 c) { return c * 0.5; }\n',
    '/data/ring.bin': ring.buffer,
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const assets = getEngine().resourceManager.assetManager;

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1.5, 1), Vector3.zero(), Vector3.axisPY());

  // fetchJsonData: the boxes come from the level file
  const level = await assets.fetchJsonData<Level>('/config/level.json');
  for (const b of level.boxes) {
    const box = new Mesh(scene, new BoxShape({ size: b.size }), lambert(...b.color));
    box.position.setXYZ(b.x, b.size / 2, b.z);
  }
  // fetchBinaryData: raw float32 positions become a triangle fan
  const bytes = await assets.fetchBinaryData('/data/ring.bin');
  const positions = new Float32Array(bytes!);
  const fan = new Primitive();
  fan.createAndSetVertexBuffer('position_f32x3', positions);
  const idx: number[] = [];
  for (let i = 1; i <= 12; i++) idx.push(0, 1 + (i % 12), i);
  fan.createAndSetIndexBuffer(new Uint16Array(idx));
  const unlit = new UnlitMaterial();
  unlit.cullMode = 'none';
  const disc = new Mesh(scene, fan, unlit);
  disc.position.setXYZ(0, 0.05, 4);
  // fetchTextData: shown as text
  const text = await assets.fetchTextData('/shaders/custom.txt');

  orbitCamera(scene, new Vector3(0, 9, 12), 100);
  stage.caption('level.json -> boxes, ring.bin -> triangle fan');
  const out = stage.readout();
  if (out) {
    out.textContent = `fetchJsonData('/config/level.json') -> "${level.title}", ${level.boxes.length} boxes\nfetchBinaryData('/data/ring.bin') -> ${bytes!.byteLength} bytes, ${positions.length / 3} vertices\nfetchTextData('/shaders/custom.txt') ->\n${text}`;
  }
  if (stage.bar) {
    button(stage.bar, 'clearCache()', () => {
      // Repeated fetches reuse the cached result until the cache is cleared
      void (async () => {
        const again = await assets.fetchJsonData<Level>('/config/level.json');
        const same = again === level;
        getEngine().resourceManager.clearCache();
        const fresh = await assets.fetchJsonData<Level>('/config/level.json');
        if (out) out.textContent += `\nsecond fetch returned the same object: ${same}; after clearCache(): ${fresh === level}`;
      })();
    });
  }
  myApp.on('tick', (_dt, ms) => {
    disc.rotation.fromEulerAngle(0, ms * 0.001, 0);
  });
  myApp.run();
});
