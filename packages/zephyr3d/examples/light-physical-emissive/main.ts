// Physical rect light luminance (nits) and emissive materials in cd/m2 with emissiveExposureWeight
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, PBRMetallicRoughnessMaterial, PlaneShape, RectLight, Scene, SphereShape } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.lightingMode = 'physical';
  scene.env.light.type = 'none';
  scene.env.sky.skyType = 'none';

  // A rect light is a luminance in cd/m2 (nits)
  const rect = new RectLight(scene);
  rect.width = 5;
  rect.height = 2.5;
  rect.range = 40;
  rect.luminance = 2000;
  rect.position.setXYZ(0, 7, 0);
  rect.lookAt(new Vector3(0, 7, 0), new Vector3(0, 0, 0), Vector3.axisNZ());

  const lit = new PBRMetallicRoughnessMaterial();
  lit.albedoColor = new Vector4(0.8, 0.75, 0.7, 1);
  lit.metallic = 0;
  lit.roughness = 0.4;
  new Mesh(scene, new PlaneShape({ size: 30 }), lit);
  const spot = new Mesh(scene, new BoxShape({ size: 2 }), lit);
  spot.position.setXYZ(-3, 1, 0);

  // An emissive sphere: emissiveLuminance is in nits when emissiveExposureWeight is 1; at 0 exposure
  // cancels out and it becomes a plain display-referred multiplier
  const glow = new PBRMetallicRoughnessMaterial();
  glow.albedoColor = new Vector4(0.1, 0.1, 0.1, 1);
  glow.emissiveColor = new Vector3(1, 0.45, 0.15);
  glow.emissiveLuminance = 200;
  glow.emissiveExposureWeight = 1;
  const bulb = new Mesh(scene, new SphereShape({ radius: 0.9 }), glow);
  bulb.position.setXYZ(3, 1, 0);

  const camera = orbitCamera(scene, new Vector3(0, 9, 14), 200, new Vector3(0, 1, 0));
  // An indoor exposure
  camera.aperture = 2.8;
  camera.shutterSpeed = 1 / 60;
  camera.ISO = 400;

  const show = (): void => stage.caption(`rect ${rect.luminance.toFixed(0)} nits, emissive ${glow.emissiveLuminance.toFixed(0)} nits, weight ${glow.emissiveExposureWeight}`);
  show();
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      glow.emissiveLuminance = 150 + 140 * Math.sin(ms * 0.002);
      rect.luminance = 2000 + 1500 * Math.sin(ms * 0.0013);
      show();
    }
  });
  if (stage.bar) {
    slider(stage.bar, 'rect luminance (nits)', [100, 20000, 100], rect.luminance, (v) => {
      rect.luminance = v;
      show();
    });
    slider(stage.bar, 'emissiveLuminance (nits)', [0, 2000, 10], glow.emissiveLuminance, (v) => {
      glow.emissiveLuminance = v;
      show();
    });
    slider(stage.bar, 'emissiveExposureWeight', [0, 1, 1], 1, (v) => {
      glow.emissiveExposureWeight = v;
      show();
    });
    slider(stage.bar, 'camera ISO', [100, 6400, 100], camera.ISO, (v) => (camera.ISO = v));
  }
  myApp.run();
});
