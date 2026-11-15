// Loading a font with the browser FontFace API before giving TextSprite its font string
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getEngine, getInput, OrbitCameraController, PerspectiveCamera, Scene, TextSprite } from '@zephyr3d/scene';
import { pixelFontBytes } from '../../shared/basic-font.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  scene.env.light.type = 'none';

  // TextSprite.font goes through the browser's canvas font resolution, which silently falls back
  // to a default face for a font that is not ready. So: load the font, add it, wait, then use it.
  // (The docs fetch Inter from a URL; the bytes here are a pixel font made in code.)
  const early = new TextSprite(scene);
  early.text = 'BEFORE LOAD';
  early.font = '48px PixelDemo, Arial'; // PixelDemo is unknown yet: the canvas uses Arial
  early.textColor = new Vector3(0.7, 0.7, 0.7);
  early.resolutionX = 512;
  early.resolutionY = 128;
  early.scale.setXYZ(4, 1, 1);
  early.position.setXYZ(0, 1.2, 0);

  const loaded = new TextSprite(scene);
  loaded.text = 'PIXEL FONT';
  loaded.textColor = new Vector3(1, 0.8, 0.3);
  loaded.resolutionX = 512;
  loaded.resolutionY = 128;
  loaded.scale.setXYZ(4, 1, 1);
  loaded.position.setXYZ(0, -0.3, 0);
  const note = stage.readout();

  const useFont = async (): Promise<void> => {
    try {
      const font = new FontFace('PixelDemo', pixelFontBytes());
      await font.load();
      document.fonts.add(font);
      await document.fonts.ready;
      loaded.font = '48px PixelDemo, Arial';
      early.text = 'AFTER LOAD';
      early.font = '48px PixelDemo, Arial';
      early.textColor = new Vector3(1, 0.8, 0.3);
      if (note) note.textContent = `document.fonts.check('48px PixelDemo'): ${document.fonts.check('48px PixelDemo')}`;
    } catch (err) {
      console.warn('Failed to load canvas font:', err);
      loaded.font = '48px Arial';
    }
  };
  loaded.font = '48px PixelDemo, Arial';
  loaded.text = 'LOADING...';

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera.lookAt(new Vector3(0, 0.3, 6), new Vector3(0, 0.3, 0), Vector3.axisPY());
  scene.mainCamera.controller = new OrbitCameraController({ center: new Vector3(0, 0.3, 0) });
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, ms) => {
    loaded.rotation.fromEulerAngle(0, Math.sin(ms * 0.0008) * 0.3, 0);
  });
  myApp.run();
  // Show the fallback first for a beat so the difference is visible, then load
  const start = stage.preview ? 700 : 1200;
  const timer = window.setTimeout(() => {
    loaded.text = 'PIXEL FONT';
    void useFont();
  }, start);
  stage.own(() => window.clearTimeout(timer));
  stage.caption('FontFace.load, document.fonts.add, then TextSprite.font');
});
