// Clustered shadows and cookies: the shadow type, shadow atlas and atlas split are scene-wide
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { canvasTexture } from '../../shared/textures.ts';

const SHADOW_TYPES: Record<string, number> = {
  SHADOW_PCF1_32F: pc.SHADOW_PCF1_32F,
  SHADOW_PCF3_32F: pc.SHADOW_PCF3_32F,
  SHADOW_PCF5_32F: pc.SHADOW_PCF5_32F,
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.03, 0.03, 0.05);

  // These settings apply to every omni and spot light's shadow and cookie.
  const lighting = app.scene.lighting;
  lighting.shadowsEnabled = true;
  lighting.cookiesEnabled = true;
  lighting.shadowType = pc.SHADOW_PCF3_32F;
  lighting.shadowAtlasResolution = 2048;
  lighting.cookieAtlasResolution = 1024;
  lighting.atlasSplit = null; // automatic: every visible light gets an equal tile

  // A cookie is a texture projected by the light: here a star and a window grille.
  const star = canvasTexture(device, (g, s) => {
    g.fillStyle = '#000';
    g.fillRect(0, 0, s, s);
    g.fillStyle = '#fff';
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? s * 0.18 : s * 0.46;
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      g.lineTo(s / 2 + Math.cos(a) * r, s / 2 + Math.sin(a) * r);
    }
    g.fill();
  }, { name: 'cookie-star', srgb: false, mipmaps: false, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE });
  const grille = canvasTexture(device, (g, s) => {
    g.fillStyle = '#fff';
    g.fillRect(0, 0, s, s);
    g.fillStyle = '#000';
    for (let i = 1; i < 4; i++) {
      g.fillRect((i * s) / 4 - 6, 0, 12, s);
      g.fillRect(0, (i * s) / 4 - 6, s, 12);
    }
  }, { name: 'cookie-grille', srgb: false, mipmaps: false, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE });

  addGround(app, '#7a8399', 24);
  addShape(app, 'box', '#e8794a', [-2.5, 0.75, -1], 1.5);
  addShape(app, 'sphere', '#4ab3e8', [2.5, 1, 1], 2);
  addShape(app, 'cylinder', '#7bc67b', [0, 1.5, 2.8], [1, 3, 1]);

  const spots = [
    { colour: new pc.Color(1, 0.8, 0.5), cookie: star, x: -5 },
    { colour: new pc.Color(0.5, 0.8, 1), cookie: grille, x: 5 },
    { colour: new pc.Color(1, 0.5, 0.8), cookie: null, x: 0 },
  ].map(({ colour, cookie, x }, i) => {
    const entity = new pc.Entity(`spot-${i}`);
    entity.addComponent('light', {
      type: 'spot', color: colour, intensity: 5, range: 20, innerConeAngle: 25, outerConeAngle: 38,
      castShadows: true, shadowResolution: 1024, normalOffsetBias: 0.05, cookie, cookieIntensity: 1,
    });
    entity.setPosition(x, 8, i === 2 ? -6 : 0);
    app.root.addChild(entity);
    return entity;
  });
  // An omni light with its own cube shadow joins the same atlas.
  const omni = new pc.Entity('omni');
  omni.addComponent('light', { type: 'omni', color: new pc.Color(1, 1, 0.8), intensity: 1.5, range: 10, castShadows: true, shadowResolution: 512 });
  app.root.addChild(omni);

  const camera = addCamera(app, { clearColor: new pc.Color(0.02, 0.02, 0.04) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0.8, 0), distance: 14, pitch: -38, autoRotate: 6, interactive: !ctx.preview });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    spots.forEach((s, i) => {
      const a = t * 0.5 + i * 2.1;
      s.setPosition(Math.cos(a) * 5, 8, Math.sin(a) * 5);
      s.lookAt(Math.cos(a + 3) * 1.5, 0, Math.sin(a + 3) * 1.5);
      s.rotateLocal(90, 0, 0);
      s.light!.cookieAngle = t * 20;
    });
    omni.setPosition(Math.sin(t * 0.8) * 4, 2.4, Math.cos(t * 0.8) * 4);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('lighting.shadowType', Object.keys(SHADOW_TYPES), 'SHADOW_PCF3_32F', (v) => (lighting.shadowType = SHADOW_TYPES[v]!));
    panel.select('shadowAtlasResolution', ['512', '1024', '2048', '4096'] as const, '2048', (v) => (lighting.shadowAtlasResolution = Number(v)));
    panel.select('atlasSplit', ['null (automatic)', '[2]', '[3, 2]'] as const, 'null (automatic)', (v) => {
      lighting.atlasSplit = v === '[2]' ? [2] : v === '[3, 2]' ? [3, 2] : null;
    });
    panel.row();
    panel.check('shadowsEnabled', true, (on) => (lighting.shadowsEnabled = on));
    panel.check('cookiesEnabled', true, (on) => (lighting.cookiesEnabled = on));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
    star.destroy();
    grille.destroy();
  };
};

export default mount;
