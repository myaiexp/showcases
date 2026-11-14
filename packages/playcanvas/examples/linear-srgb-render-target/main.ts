// Rendering into sRGB versus plain RGBA8 colour textures
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';

const SIZE = 256;

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 9, pitch: 0, yaw: 0, autoRotate: 0, toneMapping: pc.TONEMAP_NONE, clearColor: new pc.Color(0.08, 0.09, 0.12) });
  const { app, stage } = rig;
  const layers = app.scene.layers;

  // A small scene on its own layer, which the main camera does not render.
  const offscreen = new pc.Layer({ name: 'Offscreen' });
  layers.push(offscreen);
  const make = (hex: string): pc.Entity => {
    const e = addMesh(app, 'sphere', pbrMaterial(hex, { gloss: 0.6 }), [0, 0, 0], 1);
    return e;
  };
  const ball = make('#e8794a');
  ball.render!.layers = [offscreen.id];
  ball.setPosition(0, 50, 0);
  const sun = new pc.Entity('offscreen-sun');
  sun.addComponent('light', { type: 'directional', layers: [offscreen.id], intensity: 1.2 });
  sun.setEulerAngles(45, 35, 0);
  app.root.addChild(sun);

  // Same scene, two targets: the only difference is the texture's pixel format.
  const targets: pc.RenderTarget[] = [];
  const makeTarget = (name: string, format: number): pc.Texture => {
    const colorBuffer = rig.own(
      new pc.Texture(stage.device, { name, width: SIZE, height: SIZE, format, mipmaps: false, minFilter: pc.FILTER_LINEAR, magFilter: pc.FILTER_LINEAR, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE }),
    );
    const renderTarget = new pc.RenderTarget({ name, colorBuffer, depth: true });
    targets.push(renderTarget);
    const cam = new pc.Entity(`${name}-camera`);
    cam.addComponent('camera', { layers: [offscreen.id], renderTarget, priority: -1, clearColor: new pc.Color(0.35, 0.4, 0.55), fov: 30 });
    cam.setPosition(0, 50, 3.4);
    app.root.addChild(cam);
    return colorBuffer;
  };
  const srgb = makeTarget('srgb-target', pc.PIXELFORMAT_SRGBA8);
  const linear = makeTarget('rgba8-target', pc.PIXELFORMAT_RGBA8);

  // The same sphere drawn directly, as the reference for what the pixels should look like.
  const direct = make('#e8794a');
  direct.setPosition(0, -0.1, 0);
  direct.setLocalScale(2.4, 2.4, 2.4);
  const light = new pc.Entity('sun');
  light.addComponent('light', { type: 'directional', intensity: 1.2 });
  light.setEulerAngles(45, 35, 0);
  app.root.addChild(light);

  [srgb, linear].forEach((texture, i) => {
    const m = pbrMaterial('#ffffff', { diffuseMap: texture, useLighting: false });
    addMesh(app, 'plane', m, [(i * 2 - 1) * 3.6, 0, 0], 3.2).setLocalEulerAngles(90, 0, 0);
  });
  addCanvasLabels(stage.canvas, [
    { text: 'render target PIXELFORMAT_SRGBA8', rect: [0, 0.02, 0.33, 0.1] },
    { text: 'drawn directly', rect: [0.4, 0.02, 0.3, 0.1] },
    { text: 'render target PIXELFORMAT_RGBA8', rect: [0.68, 0.02, 0.32, 0.1] },
  ]);

  // The sphere sways side to side in both views, so the target is redrawn every frame.
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    ball.setPosition(Math.sin(t) * 0.6, 50, 0);
    direct.setPosition(Math.sin(t) * 0.6 * 1.9, -0.1, 0);
  });
  sway(app, rig.orbit, 10, 0.5);

  return () => {
    for (const rt of targets) rt.destroy();
    rig.dispose();
  };
};

export default mount;
