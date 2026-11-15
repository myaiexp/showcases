// MSDFTextSprite: billboard labels from a FontAsset that always face the camera
import { Vector2, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, getEngine, Mesh, MSDFText, MSDFTextSprite, Scene, SphereShape, type FontAsset } from '@zephyr3d/scene';
import { pixelFontBytes } from '../../shared/basic-font.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/fonts/pixel.ttf': pixelFontBytes() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1.2, 1), Vector3.zero(), Vector3.axisPY());
  const fontAsset = (await getEngine().resourceManager.fetchFontAsset('/fonts/pixel.ttf', { pageSize: 1024, glyphSize: 64 })) as FontAsset;

  // Three planets, each with a floating nameplate: the nameplate is a billboard, the fixed
  // MSDFText next to it is ordinary geometry that turns edge-on when you orbit.
  const names = ['MERCURY', 'VENUS', 'EARTH'];
  const colors = [lambert(0.7, 0.65, 0.6), lambert(0.95, 0.75, 0.4), lambert(0.3, 0.55, 1)];
  const plates: MSDFTextSprite[] = [];
  names.forEach((name, i) => {
    const planet = new Mesh(scene, new SphereShape({ radius: 0.7 }), colors[i]);
    planet.position.setXYZ((i - 1) * 3, 0, 0);
    const plate = new MSDFTextSprite(scene);
    plate.fontAsset = fontAsset;
    plate.text = name;
    plate.fontSize = 0.34;
    plate.textAlign = 'center';
    plate.anchor = new Vector2(0.5, 0.5);
    plate.textColor = new Vector3(1, 0.82, 0.35);
    plate.outlineColor = new Vector3(0, 0, 0);
    plate.outlineWidth = 0.05;
    plate.position.setXYZ((i - 1) * 3, 1.3, 0);
    plates.push(plate);
  });
  const flat = new MSDFText(scene);
  flat.fontAsset = fontAsset;
  flat.text = 'FLAT TEXT';
  flat.fontSize = 0.34;
  flat.anchor = new Vector2(0.5, 0.5);
  flat.textColor = new Vector3(0.5, 0.9, 1);
  flat.position.setXYZ(0, -1.5, 0);

  const camera = orbitCamera(scene, new Vector3(0, 1.5, 8), 100);
  myApp.on('tick', (_dt, ms) => {
    plates.forEach((p, i) => p.position.setXYZ((i - 1) * 3, 1.3 + Math.sin(ms * 0.0014 + i) * 0.12, 0));
    if (stage.preview) {
      // Cards have no pointer: orbit the camera by hand so the billboards visibly turn
      const a = ms * 0.0005;
      camera.lookAt(new Vector3(Math.sin(a) * 8, 1.5, Math.cos(a) * 8), Vector3.zero(), Vector3.axisPY());
    }
  });

  if (stage.bar) {
    // The Z rotation of a sprite is an in-plane billboard rotation
    slider(stage.bar, 'sprite rotation (z)', [-3.14, 3.14, 0.1], 0, (v) => plates.forEach((p) => p.rotation.fromEulerAngle(0, 0, v)));
    slider(stage.bar, 'fontSize', [0.15, 0.7, 0.05], 0.34, (v) => plates.forEach((p) => (p.fontSize = v)));
    stage.caption('drag to orbit: the plates face you, FLAT TEXT does not');
  } else {
    stage.caption('MSDFTextSprite faces the camera, MSDFText does not');
  }
  myApp.run();
});
