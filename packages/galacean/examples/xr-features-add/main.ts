// addFeature for plane, image and anchor tracking, and what comes back
import { PrimitiveMesh, Texture2D, UnlitMaterial } from '@galacean/engine';
import { XRAnchorTracking, XRImageTracking, XRPlaneMode, XRPlaneTracking, XRReferenceImage } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { add } from '../../shared/gfx-kit.ts';
import { paint } from '../../shared/textures.ts';
import { room, xrWorld } from '../../shared/xr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { hint: 'Features can only be added before a session, and only where the platform has them.' });
  room(w);
  // The reference picture image tracking would look for, drawn in code and shown on the table.
  const poster = paint(128, (g, s) => {
    g.fillStyle = '#f3ead2';
    g.fillRect(0, 0, s, s);
    g.fillStyle = '#c0392b';
    g.beginPath();
    g.arc(s / 2, s / 2, s * 0.32, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#1f2a44';
    g.fillRect(s * 0.15, s * 0.15, s * 0.2, s * 0.2);
    g.fillRect(s * 0.65, s * 0.65, s * 0.2, s * 0.2);
  });
  const texture = new Texture2D(w.stage.engine, 128, 128);
  texture.setImageSource(poster);
  texture.generateMipmaps();
  const material = new UnlitMaterial(w.stage.engine);
  material.baseTexture = texture;
  add(w.root, PrimitiveMesh.createPlane(w.stage.engine, 0.6, 0.6), material, [0, 0.8, -1.2], 'reference image');
  const out = panel(w.stage, 'tl');
  const lines: string[] = [];
  const attempt = (name: string, run: () => unknown): void => {
    try {
      const result = run();
      lines.push(`${name}: added${result ? '' : ' (null)'}`);
    } catch (e) {
      lines.push(`${name}: ${e instanceof Error ? e.message : String(e)}`);
    }
  };
  attempt('addFeature(XRPlaneTracking, EveryThing)', () => w.xr.addFeature(XRPlaneTracking, XRPlaneMode.EveryThing));
  attempt('addFeature(XRImageTracking, [poster 0.08])', () => w.xr.addFeature(XRImageTracking, [new XRReferenceImage('poster', poster, 0.08)]));
  attempt('addFeature(XRAnchorTracking)', () => w.xr.addFeature(XRAnchorTracking));
  lines.push(`getFeature(XRPlaneTracking): ${w.xr.getFeature(XRPlaneTracking) ? 'found' : 'undefined'}`);
  lines.push(`xrManager.features.length: ${w.xr.features.length}`);
  out.text(lines.join('\n'));
  return w.stage.dispose;
};

export default mount;
