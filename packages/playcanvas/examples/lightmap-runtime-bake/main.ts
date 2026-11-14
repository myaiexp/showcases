// Runtime lightmaps: baked lights, lightmapped renders, app.lightmapper.bake()
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['baked only', 'baked, also lights dynamic', 'dynamic, also lights baked', 'dynamic only'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  const scene = app.scene;
  scene.ambientLight = new pc.Color(0.04, 0.04, 0.05);
  scene.lightmapSizeMultiplier = 24; // texels per square metre before the per-entity multiplier
  scene.lightmapMaxResolution = 1024;
  scene.lightmapMode = pc.BAKE_COLORDIR;
  scene.lightmapFilterEnabled = false;

  // Static geometry gets lightmapped: it samples the baked textures instead of lighting at runtime.
  const staticShape = (type: 'box' | 'plane' | 'cylinder', hex: string, pos: [number, number, number], scale: [number, number, number]): pc.Entity => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material: colorMaterial(hex), lightmapped: true, castShadows: true, receiveShadows: true });
    e.setLocalPosition(...pos);
    e.setLocalScale(...scale);
    app.root.addChild(e);
    return e;
  };
  staticShape('plane', '#cfd3dc', [0, 0, 0], [14, 1, 14]);
  staticShape('box', '#e8794a', [-3, 1, -1], [2, 2, 2]);
  staticShape('box', '#4ab3e8', [2.5, 1.5, -2.5], [1.6, 3, 1.6]);
  staticShape('cylinder', '#f2c14e', [1, 0.75, 2.5], [1.6, 1.5, 1.6]);
  staticShape('box', '#9aa4b8', [0, 2.5, -6.2], [12, 5, 0.4]);

  // 1. A soft baked sun: bakeNumSamples and bakeArea (penumbra angle) soften its shadows.
  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional', color: new pc.Color(1, 0.96, 0.9), intensity: 0.7, castShadows: true, shadowResolution: 1024, bake: true, affectDynamic: false, bakeNumSamples: 12, bakeArea: 8 });
  sun.setEulerAngles(55, 35, 0);
  app.root.addChild(sun);

  // 2. A baked cool spot light.
  const spot = new pc.Entity('spot');
  spot.addComponent('light', { type: 'spot', color: new pc.Color(0.4, 0.6, 1), intensity: 3, range: 14, innerConeAngle: 25, outerConeAngle: 50, castShadows: true, shadowResolution: 1024, bake: true, affectDynamic: false });
  spot.setPosition(4, 6, 4);
  spot.lookAt(0, 0, 0);
  spot.rotateLocal(90, 0, 0);
  app.root.addChild(spot);

  // 3. The key light, whose bake / affect flags the panel changes.
  const key = new pc.Entity('key');
  key.addComponent('light', { type: 'omni', color: new pc.Color(1, 0.6, 0.3), intensity: 2.5, range: 10, castShadows: true, shadowResolution: 512 });
  key.setPosition(-4, 3, 3);
  app.root.addChild(key);
  const setMode = (mode: Mode): void => {
    const l = key.light!;
    l.bake = mode === 'baked only' || mode === 'baked, also lights dynamic';
    l.affectDynamic = mode !== 'baked only';
    l.affectLightmapped = mode === 'dynamic, also lights baked';
  };
  setMode('baked only');

  // A dynamic sphere: not lightmapped, lit at runtime by the lights that affect dynamic objects.
  const ball = new pc.Entity('ball');
  ball.addComponent('render', { type: 'sphere', material: colorMaterial('#ffffff'), castShadows: true });
  ball.setLocalScale(1.4, 1.4, 1.4);
  app.root.addChild(ball);

  const camera = addCamera(app, { clearColor: new pc.Color(0.03, 0.03, 0.05) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 1, 0), distance: 14, pitch: -30, autoRotate: 6, interactive: !ctx.preview });

  const stats = { ms: 0 };
  const bake = (): void => {
    const start = performance.now();
    // Bakes every lightmapped render component against the lights that have bake enabled.
    app.lightmapper!.bake(null, scene.lightmapMode);
    stats.ms = performance.now() - start;
    readout?.replaceChildren(`bake: ${stats.ms.toFixed(0)} ms, ${app.lightmapper!.stats.lightmapCount} lightmaps`);
  };
  let readout: HTMLElement | null = null;
  // Bake once the first frame has set up the transforms.
  app.once('update', bake);

  let t = 0;
  let next = 6;
  app.on('update', (dt: number) => {
    t += dt;
    ball.setPosition(Math.cos(t * 0.8) * 4, 0.9 + Math.abs(Math.sin(t * 2)) * 0.8, Math.sin(t * 0.8) * 3);
    // Cards change the baked light's colour now and then and bake again.
    if (ctx.preview && t > next) {
      next = t + 6;
      const h = t * 0.37;
      key.light!.color = new pc.Color(0.6 + 0.4 * Math.cos(h), 0.6 + 0.4 * Math.cos(h + 2.1), 0.6 + 0.4 * Math.cos(h + 4.2));
      bake();
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('key light', MODES, 'baked only', (v) => (setMode(v), bake()));
    panel.slider('sun bakeNumSamples', 1, 40, 1, 12, (v) => (sun.light!.bakeNumSamples = v));
    panel.slider('sun bakeArea (deg)', 0, 25, 1, 8, (v) => (sun.light!.bakeArea = v));
    panel.row();
    panel.slider('lightmapSizeMultiplier', 4, 64, 4, scene.lightmapSizeMultiplier, (v) => (scene.lightmapSizeMultiplier = v));
    panel.check('lightmapFilterEnabled', false, (on) => (scene.lightmapFilterEnabled = on));
    panel.select('lightmapMode', ['BAKE_COLORDIR', 'BAKE_COLOR'] as const, 'BAKE_COLORDIR', (v) => (scene.lightmapMode = v === 'BAKE_COLOR' ? pc.BAKE_COLOR : pc.BAKE_COLORDIR));
    panel.row();
    panel.button('Bake again', bake);
    readout = panel.readout('baking...');
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
