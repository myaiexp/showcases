// A camera's renderTarget sends its image to a texture, here the screen of an in-world monitor
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30, { castShadows: true, shadowDistance: 25 });
  addGround(app, '#3a4152', 30);

  // The scene the monitor shows: its own layer so the main camera never draws it twice.
  const feedLayer = new pc.Layer({ name: 'Feed' });
  app.scene.layers.push(feedLayer);
  const spinner = addShape(app, 'torus', '#f2c14e', [20, 1, 0], 1.4, { layers: [feedLayer.id], castShadows: false });
  const feedBall = addShape(app, 'sphere', '#ff4d6d', [20, 1, 0], 0.6, { layers: [feedLayer.id], castShadows: false });

  // Render target: a colour texture (sRGB so the camera's output round-trips) plus a depth buffer.
  const colorBuffer = new pc.Texture(device, {
    name: 'monitor-feed', width: 512, height: 288, format: pc.PIXELFORMAT_SRGBA8, mipmaps: false,
    minFilter: pc.FILTER_LINEAR, magFilter: pc.FILTER_LINEAR, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  const renderTarget = new pc.RenderTarget({ colorBuffer, depth: true });

  const feedCamera = addCamera(app, { layers: [feedLayer.id], clearColor: new pc.Color(0.1, 0.12, 0.35), renderTarget, priority: -1 }, 'feed');
  feedCamera.setPosition(20, 1, 4);
  feedCamera.lookAt(20, 1, 0);

  // The monitor: a box body and a plane whose emissive map is the render target's texture.
  addShape(app, 'box', '#20242e', [0, 2.2, 0], [5.4, 3.2, 0.3]);
  const screenMaterial = colorMaterial('#000000', { emissive: new pc.Color(1, 1, 1), emissiveMap: colorBuffer, useLighting: false });
  screenMaterial.emissiveIntensity = 1;
  screenMaterial.update();
  // Not a child of the body: its non-uniform scale would stretch the plane.
  const screen = addShape(app, 'plane', '#000000', [0, 2.2, 0.16], [5, 1, 2.8], { material: screenMaterial, castShadows: false });
  screen.setLocalEulerAngles(90, 0, 0);
  addShape(app, 'cylinder', '#20242e', [0, 0.3, 0], [1.2, 0.6, 1.2]);

  const mainCamera = addCamera(app);
  const orbit = createOrbit(app, mainCamera, { target: new pc.Vec3(0, 2, 0), distance: 10, pitch: -12, yaw: 15, autoRotate: 6, interactive: !ctx.preview });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    spinner.setEulerAngles(t * 60, t * 90, 0);
    feedBall.setLocalPosition(20 + Math.cos(t * 2) * 1.8, 1 + Math.sin(t * 2) * 0.8, 0);
    feedCamera.setLocalPosition(20 + Math.sin(t * 0.5) * 1.5, 1, 4);
  });

  if (!ctx.preview) {
    createPanel(el).check('monitor camera enabled', true, (on) => (feedCamera.camera!.enabled = on));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
    renderTarget.destroy();
    colorBuffer.destroy();
  };
};

export default mount;
