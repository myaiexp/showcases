// Rendering to a texture: the RenderTarget goes on the camera, not on a layer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 7, pitch: -10, autoRotate: 10 } });
  const { app, stage } = scene;
  const device = stage.device;

  // A texture to draw into, wrapped in a RenderTarget with a depth buffer.
  const texture = new pc.Texture(device, {
    name: 'rt-colour',
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  const target = new pc.RenderTarget({ colorBuffer: texture, depth: true });

  // A second scene far from the first, seen only by a camera that renders into the target.
  const far = new pc.Entity('far-scene');
  far.setPosition(200, 0, 0);
  app.root.addChild(far);
  const inner = addShape(far, 'cone', material('#f472b6', { gloss: 0.6, metalness: 0.2 }), [0, 0, 0], 1.6);
  const innerBox = addShape(far, 'box', material('#4ab3e8'), [1.8, 0, 0], 0.8);
  const rtCamera = new pc.Entity('rt-camera');
  rtCamera.addComponent('camera', {
    clearColor: new pc.Color(0.15, 0.1, 0.3),
    renderTarget: target, // the camera owns the target
    priority: -1, // lower priority renders first, so the texture is ready for the main camera
    fov: 50,
  });
  rtCamera.setLocalPosition(0, 1, 5);
  rtCamera.lookAt(0, 0, 0);
  far.addChild(rtCamera);

  // The main scene shows the texture on a lit-free screen.
  const screenMat = new pc.StandardMaterial();
  screenMat.diffuse = new pc.Color(0, 0, 0);
  screenMat.emissive = new pc.Color(1, 1, 1);
  screenMat.emissiveMap = texture;
  screenMat.useLighting = false;
  screenMat.update();
  addShape(app.root, 'box', material('#2a2e3a'), [0, 0, -0.12], [4.2, 4.2, 0.2]);
  const screen = addShape(app.root, 'plane', screenMat, [0, 0, 0.02], [4, 1, 4]);
  screen.setLocalEulerAngles(90, 0, 0);

  app.on('update', (dt: number) => {
    inner.rotate(20 * dt, 50 * dt, 0);
    innerBox.rotate(0, -90 * dt, 30 * dt);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('rt camera fov', 20, 100, 1, 50, (v) => (rtCamera.camera!.fov = v));
    panel.check('rt camera enabled', true, (on) => (rtCamera.camera!.enabled = on));
    panel.readout(`renderTarget ${target.width}x${target.height}`);
  }

  return () => {
    // The target and texture are ours to free; the camera goes with the app.
    target.destroy();
    texture.destroy();
    scene.dispose();
  };
};

export default mount;
