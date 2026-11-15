// fetchTexture options: samplerOptions, linearColorSpace, mimeType and uploading into an existing texture
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import {
  Application,
  DirectionalLight,
  getEngine,
  Mesh,
  PBRMetallicRoughnessMaterial,
  Primitive,
  Scene,
  type MeshMaterial,
} from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { brickHeight, checker, normalsFrom, png, ramp } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

/** A flat square in the XZ plane whose UVs run 0..repeat, so addressU/addressV have something to do. */
function quad(size: number, repeat: number): Primitive {
  const h = size / 2;
  const p = new Primitive();
  p.createAndSetVertexBuffer('position_f32x3', new Float32Array([-h, 0, -h, h, 0, -h, h, 0, h, -h, 0, h]));
  p.createAndSetVertexBuffer('normal_f32x3', new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]));
  p.createAndSetVertexBuffer('tex0_f32x2', new Float32Array([0, 0, repeat, 0, repeat, repeat, 0, repeat]));
  p.createAndSetIndexBuffer(new Uint16Array([0, 2, 1, 0, 3, 2]));
  return p;
}

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({
    '/textures/checker.png': png(8, 8, checker(2, [240, 240, 240], [40, 70, 160])),
    '/textures/bricks-normal.png': png(256, 256, normalsFrom((u, v) => brickHeight(u, v, 6, 3), 5)),
    // No extension: the VFS cannot tell what this is, so fetchTexture needs a mimeType
    '/textures/mystery': png(64, 64, ramp([[250, 90, 60], [250, 220, 60], [60, 200, 250]])),
    '/textures/upload.png': png(64, 64, checker(4, [250, 160, 40], [60, 20, 90])),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;

  const scene = new Scene();
  scene.env.light.type = 'none';
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(0.4, 1, 0.6), Vector3.zero(), Vector3.axisPY());

  const material = (): PBRMetallicRoughnessMaterial => {
    const m = new PBRMetallicRoughnessMaterial();
    m.metallic = 0;
    m.roughness = 0.8;
    return m;
  };
  const place = (mat: MeshMaterial, x: number, repeat: number): Mesh => {
    const mesh = new Mesh(scene, quad(3, repeat), mat);
    mesh.position.setXYZ(x, 0, 0);
    return mesh;
  };

  // 1. samplerOptions: addressing and filtering, picked while the texture loads
  const samplerMat = material();
  place(samplerMat, -5.4, 2.5);
  let address: 'repeat' | 'mirrored-repeat' | 'clamp' = 'repeat';
  let filter: 'nearest' | 'linear' = 'nearest';
  const loadSampler = async (): Promise<void> => {
    // fetchTexture caches by path, so evict the old result before asking for the other sampler
    resources.clearCache();
    samplerMat.albedoTexture = await resources.fetchTexture<Texture2D>('/textures/checker.png', {
      samplerOptions: { addressU: address, addressV: address, magFilter: filter, minFilter: filter },
    });
  };
  await loadSampler();

  // 2. linearColorSpace: a normal map is data, not colour
  const normalMat = material();
  place(normalMat, -1.8, 1);
  let linear = true;
  const loadNormal = async (): Promise<void> => {
    resources.clearCache();
    normalMat.normalTexture = await resources.fetchTexture<Texture2D>('/textures/bricks-normal.png', { linearColorSpace: linear });
  };
  await loadNormal();

  // 3. mimeType: the file has no extension to infer from
  const mimeMat = material();
  place(mimeMat, 1.8, 1);
  mimeMat.albedoTexture = await resources.fetchTexture<Texture2D>('/textures/mystery', { mimeType: 'image/png' });

  // 4. texture: upload into a texture you already made, instead of getting a new one
  const target = myApp.device.createTexture2D('rgba8unorm', 64, 64)!;
  const uploadMat = material();
  uploadMat.albedoTexture = target;
  place(uploadMat, 5.4, 1);
  const uploaded = await resources.fetchTexture<Texture2D>('/textures/upload.png', { texture: target });

  orbitCamera(scene, new Vector3(0, 7, 5.5), 100, new Vector3(0, 0, 0));

  if (stage.bar) {
    select(stage.bar, 'addressU/V', ['repeat', 'mirrored-repeat', 'clamp'] as const, address, (v) => {
      address = v;
      void loadSampler();
    });
    select(stage.bar, 'mag/min filter', ['nearest', 'linear'] as const, filter, (v) => {
      filter = v;
      void loadSampler();
    });
    toggle(stage.bar, 'normal map linearColorSpace', linear, (v) => {
      linear = v;
      void loadNormal();
    });
    stage.readout()!.textContent = `texture option: fetchTexture returned the texture it was given: ${uploaded === target}\nmimeType 'image/png' for /textures/mystery (no file extension)`;
  } else {
    stage.caption('samplerOptions, linearColorSpace, mimeType, texture');
    stage.every(2200, (i) => {
      address = (['repeat', 'mirrored-repeat', 'clamp'] as const)[i % 3]!;
      filter = i % 2 ? 'linear' : 'nearest';
      linear = i % 4 !== 3;
      void loadSampler().then(loadNormal);
    });
  }
  myApp.run();
});
