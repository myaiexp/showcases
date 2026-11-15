// RectLight: a rectangular emitter with width, height and range, over glossy surfaces
import { Vector3, Vector4 } from '@zephyr3d/base';
import { Application, Scene, BoxShape, Mesh, PBRMetallicRoughnessMaterial, PlaneShape, RectLight, UnlitMaterial } from '@zephyr3d/scene';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'none';

  // Rectangle size in scene units; light leaves it along the node's -Z axis
  const light = new RectLight(scene);
  light.width = 4;
  light.height = 2;
  light.range = 40;
  light.color = new Vector4(1, 1, 1, 1);
  light.intensity = 5;

  // The light draws nothing itself: an unlit panel parented to it shows where it is
  const panelMaterial = new UnlitMaterial();
  panelMaterial.albedoColor = new Vector4(1, 1, 1, 1);
  const panel = new Mesh(scene, new BoxShape({ size: 1, sizeY: 1, sizeZ: 0.05 }), panelMaterial);
  panel.parent = light;
  panel.scale.setXYZ(light.width, light.height, 1);

  const boxMaterial = new PBRMetallicRoughnessMaterial();
  boxMaterial.albedoColor = new Vector4(1, 1, 0, 1);
  boxMaterial.metallic = 0;
  boxMaterial.roughness = 0.5;
  const boxShape = new BoxShape({ size: 2 });
  for (let i = 0; i < 8; i++) {
    const box = new Mesh(scene, boxShape, boxMaterial);
    const angle = (i / 8) * Math.PI * 2;
    box.position.setXYZ(Math.cos(angle) * 5, 1, Math.sin(angle) * 5);
  }
  // A smooth floor shows the rectangle-shaped highlight
  const floorMaterial = new PBRMetallicRoughnessMaterial();
  floorMaterial.albedoColor = new Vector4(0, 1, 1, 1);
  floorMaterial.metallic = 0;
  floorMaterial.roughness = 0.2;
  new Mesh(scene, new PlaneShape({ size: 60 }), floorMaterial);

  orbitCamera(scene, new Vector3(14, 12, 14), 600);

  myApp.on('tick', (_dt, ms) => {
    // Circle the scene, always facing its centre
    const t = ms * 0.0003;
    light.lookAt(new Vector3(Math.cos(t) * 8, 4, Math.sin(t) * 8), Vector3.zero(), Vector3.axisPY());
  });

  if (stage.bar) {
    const resize = (): void => {
      panel.scale.setXYZ(light.width, light.height, 1);
    };
    slider(stage.bar, 'width', [0.5, 10, 0.5], light.width, (v) => {
      light.width = v;
      resize();
    });
    slider(stage.bar, 'height', [0.5, 10, 0.5], light.height, (v) => {
      light.height = v;
      resize();
    });
    slider(stage.bar, 'range', [5, 80, 1], light.range, (v) => (light.range = v));
    slider(stage.bar, 'intensity', [0, 20, 0.5], light.intensity, (v) => (light.intensity = v));
  } else {
    stage.caption('RectLight 4 x 2');
  }
  myApp.run();
});
