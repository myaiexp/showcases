// FontAsset atlas settings: pageSize and glyphSize decide how sharp MSDF text stays when enlarged
import { Vector2, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getEngine, getInput, MSDFText, OrbitCameraController, PerspectiveCamera, Scene, type FontAsset } from '@zephyr3d/scene';
import { pixelFontBytes } from '../../shared/basic-font.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // Options apply the first time a URL loads and cached loads reuse that FontAsset, so the same
  // font is served under three paths to get three different atlases.
  const bytes = pixelFontBytes();
  const VFS = await memoryFiles({ '/fonts/small.ttf': bytes.slice(0), '/fonts/medium.ttf': bytes.slice(0), '/fonts/large.ttf': bytes.slice(0) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  scene.env.light.type = 'none';
  const resources = getEngine().resourceManager;
  const setups = [
    { path: '/fonts/small.ttf', pageSize: 256, glyphSize: 8 },
    { path: '/fonts/medium.ttf', pageSize: 512, glyphSize: 16 },
    { path: '/fonts/large.ttf', pageSize: 1024, glyphSize: 64 },
  ];
  const texts: MSDFText[] = [];
  for (const [i, s] of setups.entries()) {
    const font = (await resources.fetchFontAsset(s.path, { pageSize: s.pageSize, glyphSize: s.glyphSize })) as FontAsset;
    const t = new MSDFText(scene);
    t.fontAsset = font;
    t.text = `GLYPH ${font.msdfGlyphSize} PAGE ${font.msdfAtlasPageSize}`;
    t.fontSize = 0.5;
    t.anchor = new Vector2(0.5, 0.5);
    t.textColor = new Vector3(0.95 - i * 0.3, 0.85, 0.4 + i * 0.3);
    t.position.setXYZ(0, 1.2 - i * 1.2, 0);
    texts.push(t);
  }

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 0.05, 100);
  scene.mainCamera.lookAt(new Vector3(0, 0, 8), Vector3.zero(), Vector3.axisPY());
  scene.mainCamera.controller = new OrbitCameraController({ center: Vector3.zero(), zoomSpeed: 1 });
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  if (stage.bar) {
    slider(stage.bar, 'zoom: camera distance', [0.6, 12, 0.2], 8, (v) => {
      scene.mainCamera!.lookAt(new Vector3(-1.5, 0, v), new Vector3(-1.5, 0, 0), Vector3.axisPY());
    });
    stage.caption('zoom in: small glyph sizes blur sooner');
  } else {
    // Cards: slowly dolly in on the left edge of the text, where the difference is visible
    myApp.on('tick', (_dt, ms) => {
      const d = 4 + 3 * Math.sin(ms * 0.0006);
      scene.mainCamera!.lookAt(new Vector3(-1.6, 0, d), new Vector3(-1.6, 0, 0), Vector3.axisPY());
    });
    stage.caption('fetchFontAsset({ pageSize, glyphSize }): 8 / 16 / 64');
  }
  myApp.run();
});
