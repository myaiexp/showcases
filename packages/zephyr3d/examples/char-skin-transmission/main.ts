// SSSMaterial on a head and thin ears: back-lit transmission from the subsurface texture's thickness
import { Vector3, Vector4 } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, getDevice, getEngine, Mesh, Scene, SphereShape, SSSMaterial } from '@zephyr3d/scene';
import { animScene } from '../../shared/anim-kit.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

// A flat 4x4 subsurface map: R = skin mask, G = softness, B = thickness (high where the skin is thin)
const mask = (thickness: number) => png(4, 4, (px) => {
  for (let i = 0; i < px.length; i += 4) {
    px[i] = 255;
    px[i + 1] = 128;
    px[i + 2] = thickness;
    px[i + 3] = 255;
  }
});

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/thick.png': mask(40), '/textures/thin.png': mask(255) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const camera = animScene(scene, { eye: new Vector3(0.4, 0.9, 2.4), target: new Vector3(0, 0.7, 0), floorSize: 3, shadows: false });
  // A strong light from behind and above the head: it can only reach the camera by passing through skin
  const back = new DirectionalLight(scene);
  back.lookAt(new Vector3(-0.3, 1.4, -2), Vector3.zero(), Vector3.axisPY());
  back.intensity = 6;

  const textures = getEngine().resourceManager;
  const make = async (map: string): Promise<SSSMaterial> => {
    const m = new SSSMaterial();
    m.albedoColor = new Vector4(0.85, 0.55, 0.45, 1);
    m.subsurfaceTexture = await textures.fetchTexture<Texture2D>(map, { linearColorSpace: true });
    m.roughness = 0.45;
    m.transmissionStrength = 1;
    return m;
  };
  const headMat = await make('/textures/thick.png');
  const earMat = await make('/textures/thin.png');
  const head = new Mesh(scene, new SphereShape({ radius: 0.5 }), headMat);
  head.position.setXYZ(0, 0.7, 0);
  head.scale.setXYZ(0.85, 1.05, 0.95);
  for (const side of [-1, 1]) {
    const ear = new Mesh(scene, new SphereShape({ radius: 0.15 }), earMat);
    ear.position.setXYZ(side * 0.45, 0.72, -0.05);
    ear.scale.setXYZ(0.25, 1, 0.7);
  }
  // The diffusion half of the effect is a camera post effect; it needs WebGPU
  camera.SSS = true;

  const out = stage.readout();
  const show = (): void => {
    stage.caption(`transmissionStrength ${headMat.transmissionStrength.toFixed(1)}`);
    if (out) out.textContent = `${getDevice().type}: camera.SSS = ${camera.SSS} (diffusion needs WebGPU); transmission through the thin ears still applies`;
  };
  show();
  if (stage.bar) {
    slider(stage.bar, 'transmissionStrength', [0, 3, 0.05], 1, (v) => {
      headMat.transmissionStrength = v;
      earMat.transmissionStrength = v;
      show();
    });
    slider(stage.bar, 'roughness', [0.1, 1, 0.05], 0.45, (v) => ((headMat.roughness = v), (earMat.roughness = v)));
    slider(stage.bar, 'backlight', [0, 12, 0.5], back.intensity, (v) => (back.intensity = v));
    toggle(stage.bar, 'camera.SSS', true, (v) => ((camera.SSS = v), show()));
  } else {
    myApp.on('tick', (_dt: number, elapsed: number) => {
      const s = 0.5 + 0.5 * Math.sin(elapsed / 900);
      headMat.transmissionStrength = earMat.transmissionStrength = 3 * s;
      stage.caption(`transmissionStrength ${(3 * s).toFixed(1)}`);
    });
  }
  myApp.run();
});
