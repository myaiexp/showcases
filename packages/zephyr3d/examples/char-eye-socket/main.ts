// EyeMaterial socket occlusion (analytic lid aperture) and contact AO (real lid mesh), with blinking lids
import { Vector3 } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, EyeMaterial, getEngine, Mesh, Scene } from '@zephyr3d/scene';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { eyeball, irisTexture, lidBand } from '../../shared/char-kit.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/iris.png': irisTexture([80, 140, 100]) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  // Constant ambient light, so the eye is not dominated by reflections of the sky
  scene.env.light.type = 'constant';
  animScene(scene, { eye: new Vector3(0.5, 1.1, 1.9), target: new Vector3(0, 1, 0), floorSize: 4, shadows: false });
  const top = new DirectionalLight(scene);
  top.intensity = 3;
  top.lookAt(new Vector3(0.3, 3, 1.2), new Vector3(0, 1, 0), Vector3.axisPY());

  const material = new EyeMaterial();
  material.vertexNormal = true; // socket occlusion is gated on vertexNormal
  material.vertexTangent = true;
  material.irisTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/iris.png');
  const eye = new Mesh(scene, eyeball(0.5), material);
  eye.position.setXYZ(0, 1, 0);

  // Two lid shells just outside the eyeball; blinking rotates them about X
  const skin = flat(0.78, 0.55, 0.45);
  skin.cullMode = 'none';
  const upper = new Mesh(scene, lidBand(0.54, 0.62, 1.3), skin);
  const lower = new Mesh(scene, lidBand(0.54, -1.3, -0.62), skin);
  upper.position.setXYZ(0, 1, 0);
  lower.position.setXYZ(0, 1, 0);

  material.socketOcclusion = true;
  material.upperLidAngle = 50; // degrees
  material.lowerLidAngle = 65;
  material.contactAO = true;

  const show = (): void => stage.caption(`socketOcclusion ${material.socketOcclusion}, contactAO ${material.contactAO}`);
  show();
  let blinking = true;
  if (stage.bar) {
    const bar = stage.bar;
    toggle(bar, 'socketOcclusion', true, (v) => ((material.socketOcclusion = v), show()));
    slider(bar, 'upperLidAngle', [10, 90, 1], material.upperLidAngle, (v) => (material.upperLidAngle = v));
    slider(bar, 'lowerLidAngle', [10, 90, 1], material.lowerLidAngle, (v) => (material.lowerLidAngle = v));
    slider(bar, 'socketOcclusionSoftness', [0, 1, 0.02], material.socketOcclusionSoftness, (v) => (material.socketOcclusionSoftness = v));
    slider(bar, 'socketOcclusionStrength', [0, 1, 0.02], material.socketOcclusionStrength, (v) => (material.socketOcclusionStrength = v));
    toggle(bar, 'contactAO', true, (v) => ((material.contactAO = v), show()));
    slider(bar, 'contactAORadius', [0.001, 0.05, 0.001], material.contactAORadius, (v) => (material.contactAORadius = v));
    slider(bar, 'contactAOStrength', [0, 1.5, 0.05], material.contactAOStrength, (v) => (material.contactAOStrength = v));
    toggle(bar, 'blink', true, (v) => (blinking = v));
  } else {
    stage.every(3000, (i) => {
      material.socketOcclusion = i % 2 === 0;
      material.contactAO = i % 4 < 2;
      show();
    });
  }
  const out = stage.readout();
  if (out) out.textContent = 'Both layers are off by default. contactAO reads the depth prepass: it follows the lids as they move; the analytic aperture does not.';
  myApp.on('tick', (_dt: number, elapsed: number) => {
    // A blink every 2.4 s: the lids close in 0.2 s and reopen
    const t = (elapsed % 2400) / 2400;
    const closed = blinking ? Math.max(0, 1 - Math.abs(t * 12 - 1)) : 0;
    upper.rotation.fromAxisAngle(Vector3.axisPX(), 0.72 * closed);
    lower.rotation.fromAxisAngle(Vector3.axisPX(), -0.72 * closed);
  });
  myApp.run();
});
