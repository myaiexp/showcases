// TextSprite: text drawn to a texture and shown as a camera-facing sprite, with its properties
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getEngine, getInput, OrbitCameraController, PerspectiveCamera, Scene, TextSprite } from '@zephyr3d/scene';
import { color, select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  scene.env.light.type = 'none';

  const label = new TextSprite(scene);
  // Newline characters are supported; the font is a browser canvas font string
  label.text = 'TextSprite\ncanvas texture';
  label.font = 'bold 42px Arial';
  // Linear RGB, 0..1
  label.textColor = new Vector3(1, 0.35, 0.3);
  // Pixel size of the generated texture: raise it when the sprite is big on screen
  label.resolutionX = 512;
  label.resolutionY = 192;
  label.position.setXYZ(0, 0.3, 0);
  label.scale.setXYZ(4.6, 1.7, 1);

  // A second, tiny label shows the effect of anchorX/anchorY: its pivot sits on the marker
  const pivot = new TextSprite(scene);
  pivot.text = '+ pivot';
  pivot.font = 'bold 40px Arial';
  pivot.textColor = new Vector3(0.4, 0.9, 1);
  pivot.resolutionX = 256;
  pivot.resolutionY = 96;
  pivot.scale.setXYZ(2.4, 0.9, 1);
  pivot.position.setXYZ(0, -1.7, 0);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera.lookAt(new Vector3(0, 0, 7), Vector3.zero(), Vector3.axisPY());
  scene.mainCamera.controller = new OrbitCameraController({ center: Vector3.zero() });
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, ms) => {
    // Rotating the node tilts the text in its plane
    label.rotation.fromEulerAngle(0, 0, Math.sin(ms * 0.001) * 0.08);
  });

  if (stage.bar) {
    // Changing any of these redraws the offscreen texture, so it is not something to do every frame
    select(stage.bar, 'text', ['TextSprite\ncanvas texture', 'one line', 'three\nshort\nlines'] as const, label.text as 'one line', (v) => (label.text = v));
    select(stage.bar, 'font', ['bold 42px Arial', '42px serif', 'italic 42px monospace'] as const, 'bold 42px Arial', (v) => (label.font = v));
    slider(stage.bar, 'resolution', [32, 1024, 32], 512, (v) => {
      label.resolutionX = v;
      label.resolutionY = Math.round(v * 0.375);
    });
    color(stage.bar, 'textColor', '#ff594d', (r, g, b) => (label.textColor = new Vector3(r, g, b)));
    slider(stage.bar, 'pivot anchorX', [0, 1, 0.5], 0.5, (v) => (pivot.anchorX = v));
    slider(stage.bar, 'pivot anchorY', [0, 1, 0.5], 0.5, (v) => (pivot.anchorY = v));
  } else {
    stage.caption('TextSprite: text, font, resolution, textColor');
  }
  myApp.run();
});
