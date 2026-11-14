// LensFlareEffect: flares following the sun and a lamp, fading when covered
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, daySky, pbrMaterial } from '../../shared/pbr.ts';
import { createPostRig } from '../../shared/posteffects.ts';
import { canvasTexture } from '../../shared/textures.ts';

const SIZE = 256;

const mount: Mount = async (el, ctx) => {
  // The sun sits low in front of the camera (towards -Z); the light shines the opposite way.
  const sunDir: [number, number, number] = [0, 0.3, -0.95];
  const rig = await createPostRig(el, ctx, {
    sky: daySky({ sun: 40, sunDir, panels: false, zenith: [0.08, 0.2, 0.6] }),
    distance: 12,
    pitch: -4,
    yaw: 0,
    autoRotate: 0,
    target: new pc.Vec3(0, 1.2, 0),
  });
  const { app, frame, sunLight } = rig;
  sunLight!.setEulerAngles(17.5, 180, 0);
  sunLight!.light!.intensity = 1.2;

  addMesh(app, 'plane', pbrMaterial('#4d5260', { gloss: 0.4 }), [0, 0, -4], [40, 1, 40]);
  const stone = pbrMaterial('#b8bcc8', { gloss: 0.3 });
  [-5, -2, 1.5, 5].forEach((x, i) => addMesh(app, 'box', stone, [x, 2 + (i % 2), -9], [1.2, 4 + (i % 2) * 2, 1.2]));
  const lampPos = new pc.Vec3(-3.5, 2.2, 1.5);
  addMesh(app, 'sphere', pbrMaterial('#000000', { emissive: new pc.Color(1, 0.8, 0.5), emissiveIntensity: 20 }), [lampPos.x, lampPos.y, lampPos.z], 0.4);

  // Shapes for the library: white on transparent, drawn with a 2D canvas.
  const glow = canvasTexture(rig.stage.device, (g, s) => {
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.35)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  }, { size: SIZE, name: 'flare-glow', srgb: false, mipmaps: false, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE });
  const star = canvasTexture(rig.stage.device, (g, s) => {
    g.translate(s / 2, s / 2);
    for (let i = 0; i < 8; i++) {
      g.rotate(Math.PI / 4);
      const grad = g.createLinearGradient(0, 0, s / 2, 0);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(0, -2, s / 2, 4);
    }
  }, { size: SIZE, name: 'flare-star', srgb: false, mipmaps: false, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE });
  const disc = canvasTexture(rig.stage.device, (g, s) => {
    g.strokeStyle = 'rgba(255,255,255,0.9)';
    g.lineWidth = s * 0.06;
    g.beginPath();
    g.arc(s / 2, s / 2, s * 0.4, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.18)';
    g.fill();
  }, { size: SIZE, name: 'flare-disc', srgb: false, mipmaps: false, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE });

  const lensFlare = rig.addEffect(new pc.LensFlareEffect(app.graphicsDevice));
  lensFlare.shapes = { resolution: SIZE, shapes: { glow, star, disc } };

  // A look is plain data: elements placed along the axis from the source through the screen centre.
  const sunFlare = new pc.LensFlare(
    {
      elements: [
        { shape: 'glow', size: 0.6, color: [1, 0.9, 0.7], intensity: 0.5 },
        { shape: 'star', size: 1.2, intensity: 0.4 },
        { shape: 'disc', offset: 0.5, size: 0.08, color: [0.4, 0.8, 1], count: 4, spread: 0.4, intensity: 0.6 },
      ],
    },
    { light: sunLight!.light! },
  );
  const lampFlare = new pc.LensFlare(
    { elements: [{ shape: 'glow', size: 0.25, color: [1, 0.75, 0.4], intensity: 0.8 }, { shape: 'star', size: 0.35, intensity: 0.3 }] },
    { position: lampPos },
  );
  lensFlare.add(sunFlare);
  lensFlare.add(lampFlare);
  rig.apply();

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // sweep the view across the sun so the flare slides through the pillars' occlusion
    rig.orbit.yaw = Math.sin(t * 0.4) * 28;
    rig.orbit.pitch = -4 + Math.sin(t * 0.27) * 3;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('effect intensity', 0, 3, 0.05, 1, (v) => (lensFlare.intensity = v));
    panel.slider('effect scale (resolution)', 0.25, 1, 0.05, lensFlare.scale, (v) => (lensFlare.scale = v));
    panel.slider('sun flare scale', 0.2, 2, 0.05, 1, (v) => (sunFlare.scale = v));
    panel.row();
    panel.slider('occlusionRadius', 0, 0.2, 0.005, sunFlare.occlusionRadius, (v) => (sunFlare.occlusionRadius = v));
    panel.slider('edgeFade', 0, 0.5, 0.01, sunFlare.edgeFade, (v) => (sunFlare.edgeFade = v));
    panel.check('sun flare enabled', true, (on) => (sunFlare.enabled = on));
    panel.check('lamp flare enabled', true, (on) => (lampFlare.enabled = on));
    panel.check('lensflare debug view', false, (on) => rig.tweak(() => (frame.debug = on ? 'lensflare' : null)));
  }

  return () => {
    for (const texture of [glow, star, disc]) texture.destroy();
    rig.dispose();
  };
};

export default mount;
