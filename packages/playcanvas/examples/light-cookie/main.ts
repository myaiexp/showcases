// Spot light cookie: a texture projected through the light, with angle, scale
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 9, pitch: -50, autoRotate: 5 }, floor: 16, ambient: '#0a0c12' });
  const { app } = scene;

  // A window-like cookie drawn in code: white where light passes, black where it is blocked.
  const cookie = canvasTexture(
    scene.stage.device,
    (g, s) => {
      g.fillStyle = '#000';
      g.fillRect(0, 0, s, s);
      g.fillStyle = '#fff';
      const pane = s * 0.36;
      for (const [x, y] of [[0.08, 0.08], [0.56, 0.08], [0.08, 0.56], [0.56, 0.56]] as const) g.fillRect(x * s, y * s, pane, pane);
      g.fillStyle = '#9a9a9a';
      g.beginPath();
      g.arc(s / 2, s / 2, s * 0.06, 0, Math.PI * 2);
      g.fill();
    },
    { size: 256, name: 'cookie', srgb: false, mipmaps: false, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE },
  );

  // Clustered lighting is on by default and draws cookies from an atlas only when enabled.
  app.scene.lighting.cookiesEnabled = true;

  const spot = new pc.Entity('spot');
  spot.addComponent('light', {
    type: 'spot',
    range: 20,
    intensity: 5,
    innerConeAngle: 38,
    outerConeAngle: 40,
    cookie,
    cookieIntensity: 1,
    cookieChannel: 'rgb',
    cookieAngle: 0,
    cookieScale: new pc.Vec2(1, 1),
    cookieOffset: new pc.Vec2(0, 0),
    cookieFalloff: false,
  });
  spot.setPosition(0, 7, 0);
  spot.setEulerAngles(0, 0, 0);
  app.root.addChild(spot);
  const light = spot.light!;

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) light.cookieAngle = (t * 40) % 360;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('cookieIntensity', 0, 1, 0.01, 1, (v) => (light.cookieIntensity = v));
    panel.slider('cookieAngle', 0, 360, 1, 0, (v) => (light.cookieAngle = v));
    panel.slider('cookieScale', 0.3, 3, 0.05, 1, (v) => (light.cookieScale = new pc.Vec2(v, v)));
    panel.row();
    panel.slider('cookieOffset x', -1, 1, 0.01, 0, (v) => setOffset({ x: v }));
    panel.slider('cookieOffset y', -1, 1, 0.01, 0, (v) => setOffset({ y: v }));
    panel.check('cookieFalloff', false, (on) => (light.cookieFalloff = on));
    panel.select('cookieChannel', ['rgb', 'r', 'g', 'b', 'a'], 'rgb', (v) => (light.cookieChannel = v));
    const off = { x: 0, y: 0 };
    function setOffset(p: { x?: number; y?: number }): void {
      off.x = p.x ?? off.x;
      off.y = p.y ?? off.y;
      light.cookieOffset = new pc.Vec2(off.x, off.y);
    }
  }

  return () => {
    cookie.destroy();
    scene.dispose();
  };
};

export default mount;
