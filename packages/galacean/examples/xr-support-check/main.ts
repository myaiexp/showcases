// isSupportedMode and isSupportedFeature: the compatibility probe from the docs
import { XRAnchorTracking, XRHitTest, XRImageTracking, XRPlaneTracking, XRSessionMode } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { spin } from '../../shared/gfx-kit.ts';
import { room, settle, xrWorld } from '../../shared/xr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { hint: 'No session is requested: these are only questions.' });
  room(w);
  const { xr } = w;
  const out = panel(w.stage, 'tl');
  const lines: string[] = [`isSecureContext: ${window.isSecureContext}`, `navigator.xr: ${'xr' in navigator ? 'present' : 'absent'}`];
  const show = (line?: string): void => {
    if (line) lines.push(line);
    out.text(lines.join('\n'));
  };
  show();
  settle(w.stage, xr.sessionManager.isSupportedMode(XRSessionMode.AR), 'isSupportedMode(AR): supported', 'isSupportedMode(AR): refused -', show);
  settle(w.stage, xr.sessionManager.isSupportedMode(XRSessionMode.VR), 'isSupportedMode(VR): supported', 'isSupportedMode(VR): refused -', show);
  show(`isSupportedFeature(XRPlaneTracking): ${xr.isSupportedFeature(XRPlaneTracking) === true}`);
  show(`isSupportedFeature(XRAnchorTracking): ${xr.isSupportedFeature(XRAnchorTracking) === true}`);
  show(`isSupportedFeature(XRImageTracking): ${xr.isSupportedFeature(XRImageTracking) === true}`);
  show(`isSupportedFeature(XRHitTest): ${xr.isSupportedFeature(XRHitTest) === true}`);
  spin(w.root.createChild('marker'), [0, 40, 0]);
  return w.stage.dispose;
};

export default mount;
