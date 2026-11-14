// Six cameras render into the faces of a cubemap that a mirror ball reflects
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { pbrMaterial } from '../../shared/pbr.ts';

// The camera rotations the engine itself uses for the six cubemap faces: +X, -X, +Y, -Y, +Z, -Z.
const FACE_ANGLES: [number, number, number][] = [
  [0, 90, 180],
  [0, -90, 180],
  [90, 0, 0],
  [-90, 0, 0],
  [0, 180, 180],
  [0, 0, 180],
];

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 9, pitch: -18, autoRotate: 10, clear: '#1b2438' });
  const { app, stage } = scene;
  const device = stage.device;
  const layers = app.scene.layers;
  const world = layers.getLayerByName('World')!;
  const skybox = layers.getLayerByName('Skybox')!;

  // The mirror lives in its own layer: the face cameras skip it, so it never reflects itself.
  const excluded = new pc.Layer({ name: 'Excluded' });
  layers.insert(excluded, 1);
  scene.camera.camera!.layers = [world.id, excluded.id, skybox.id];

  // Things to reflect: coloured shapes circling the mirror.
  const shapes = (['box', 'cone', 'torus', 'sphere'] as const).map((type, i) => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material: colorMaterial(['#e8794a', '#7bc67b', '#f2c14e', '#a78bfa'][i]!), castShadows: false });
    app.root.addChild(e);
    return e;
  });
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    shapes.forEach((s, i) => {
      const a = t * 0.7 + (i / shapes.length) * Math.PI * 2;
      s.setLocalPosition(Math.cos(a) * 3.4, 0.9 + Math.sin(t * 1.3 + i) * 0.5, Math.sin(a) * 3.4);
      s.setLocalEulerAngles(t * 40, t * 55, 0);
    });
  });

  const mirror = new pc.Entity('mirror');
  const mirrorMaterial = pbrMaterial('#ffffff', { metalness: 1, gloss: 1, useSkybox: false });
  mirror.addComponent('render', { type: 'sphere', material: mirrorMaterial, layers: [excluded.id], castShadows: false });
  mirror.setLocalPosition(0, 1.2, 0);
  mirror.setLocalScale(2.2, 2.2, 2.2);
  app.root.addChild(mirror);

  // One cubemap texture, and a render target plus a 90 degree camera for each face.
  let cubemap: pc.Texture | null = null;
  let targets: pc.RenderTarget[] = [];
  let cameras: pc.Entity[] = [];
  const teardown = (): void => {
    cameras.forEach((c) => c.destroy());
    targets.forEach((r) => r.destroy()); // the faces share one texture: destroy it once
    cubemap?.destroy();
    cameras = [];
    targets = [];
    cubemap = null;
  };
  const build = (size: number): void => {
    teardown();
    cubemap = new pc.Texture(device, {
      name: 'mirror-cubemap',
      width: size,
      height: size,
      cubemap: true,
      format: pc.PIXELFORMAT_RGBA8,
      mipmaps: false,
      minFilter: pc.FILTER_LINEAR,
      magFilter: pc.FILTER_LINEAR,
      addressU: pc.ADDRESS_CLAMP_TO_EDGE,
      addressV: pc.ADDRESS_CLAMP_TO_EDGE,
    });
    FACE_ANGLES.forEach((angles, face) => {
      const renderTarget = new pc.RenderTarget({ colorBuffer: cubemap!, face, depth: true, origin: pc.RENDERTARGET_ORIGIN_TOP });
      const camera = new pc.Entity(`face ${face}`);
      camera.addComponent('camera', {
        fov: 90,
        nearClip: 0.2,
        farClip: 60,
        priority: -10 + face, // before the main camera, in face order
        renderTarget,
        layers: [world.id, skybox.id],
        clearColor: new pc.Color().fromString('#1b2438'),
      });
      camera.setLocalPosition(mirror.getLocalPosition());
      camera.setLocalEulerAngles(...angles);
      app.root.addChild(camera);
      targets.push(renderTarget);
      cameras.push(camera);
    });
    mirrorMaterial.cubeMap = cubemap;
    mirrorMaterial.update();
  };
  build(ctx.preview ? 96 : 256);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('face size', ['32', '64', '128', '256', '512'], '256', (v) => build(Number(v)));
    panel.readout('six cameras, priorities -10 to -5, each with its own face of one texture');
  }

  return () => {
    teardown();
    mirrorMaterial.destroy();
    layers.remove(excluded);
    scene.dispose();
  };
};

export default mount;
