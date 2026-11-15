// MSDFText: sharp 3D text from a FontAsset, with layout and outline properties
import { Vector2, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, getEngine, Mesh, MSDFText, PlaneShape, Scene, type FontAsset } from '@zephyr3d/scene';
import { pixelFontBytes } from '../../shared/basic-font.ts';
import { color, select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // The docs fetch an Inter font file; this is a pixel font drawn in code and served from memory
  const VFS = await memoryFiles({ '/fonts/pixel.ttf': pixelFontBytes() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  scene.env.light.type = 'none';
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(0.5, 1.2, 1), Vector3.zero(), Vector3.axisPY());
  light.castShadow = true;
  const floor = new Mesh(scene, new PlaneShape({ size: 12 }), lambert(0.3, 0.35, 0.45));
  floor.position.setXYZ(0, -1.6, 0);

  // pageSize: atlas texture size; glyphSize: base MSDF glyph resolution
  const fontAsset = (await getEngine().resourceManager.fetchFontAsset('/fonts/pixel.ttf', { pageSize: 1024, glyphSize: 64 })) as FontAsset;

  const text = new MSDFText(scene);
  text.fontAsset = fontAsset; // no geometry until fontAsset and text are both set
  text.text = 'MSDF TEXT\nSHARP AT ANY SIZE';
  text.fontSize = 0.5;
  text.maxWidth = 0; // 0 disables wrapping
  text.textAlign = 'center';
  text.anchor = new Vector2(0.5, 0.5);
  text.textColor = new Vector3(0.45, 0.9, 1);
  text.outlineColor = new Vector3(0.01, 0.04, 0.08);
  text.outlineWidth = 0.05;
  text.castShadow = true;

  orbitCamera(scene, new Vector3(0, 1.2, 6), 100);

  myApp.on('tick', (_dt, ms) => {
    text.rotation.fromEulerAngle(0, Math.sin(ms * 0.0007) * 0.5, 0);
  });

  if (stage.bar) {
    slider(stage.bar, 'fontSize', [0.2, 1, 0.05], text.fontSize, (v) => (text.fontSize = v));
    slider(stage.bar, 'maxWidth', [0, 8, 0.5], 0, (v) => (text.maxWidth = v));
    select(stage.bar, 'textAlign', ['left', 'center', 'right'] as const, 'center', (v) => (text.textAlign = v));
    slider(stage.bar, 'anchorX', [0, 1, 0.5], 0.5, (v) => (text.anchorX = v));
    slider(stage.bar, 'anchorY', [0, 1, 0.5], 0.5, (v) => (text.anchorY = v));
    slider(stage.bar, 'outlineWidth', [0, 0.15, 0.01], text.outlineWidth, (v) => (text.outlineWidth = v));
    color(stage.bar, 'textColor', '#73e6ff', (r, g, b) => (text.textColor = new Vector3(r, g, b)));
    color(stage.bar, 'outlineColor', '#03060d', (r, g, b) => (text.outlineColor = new Vector3(r, g, b)));
    toggle(stage.bar, 'castShadow', true, (v) => (text.castShadow = v));
    stage.readout()!.textContent = `font metrics: unitsPerEm ${fontAsset.metrics.unitsPerEm}, ${fontAsset.metrics.glyphCount} glyphs; atlas page ${fontAsset.msdfAtlasPageSize}px, glyph ${fontAsset.msdfGlyphSize}px`;
  } else {
    stage.caption('MSDFText: fontAsset, text, fontSize, outline');
  }
  myApp.run();
});
