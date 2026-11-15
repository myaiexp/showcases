// cameraManager.attachCamera / detachCamera, and fixedFoveation with no session
import { Camera, PrimitiveMesh } from '@galacean/engine';
import { XRTrackedInputDevice } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { PALETTE } from '../../shared/core-kit.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { room, xrWorld } from '../../shared/xr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { hint: 'The spare camera is switched off, so attaching it does not change this view.' });
  room(w);
  const { xr } = w;
  const spare = w.origin.createChild('xr camera');
  spare.transform.setPosition(0, 1.6, 2);
  add(spare, PrimitiveMesh.createCuboid(w.stage.engine, 0.3, 0.2, 0.2), blinn(w.stage.engine, [...PALETTE.cyan]));
  const xrCamera = spare.addComponent(Camera);
  xrCamera.enabled = false;
  const out = panel(w.stage, 'tl');
  let attached: Camera | null = null;
  const lines = (): string => {
    let foveation: string;
    try {
      foveation = String(xr.cameraManager.fixedFoveation);
    } catch (e) {
      foveation = `throws: ${e instanceof Error ? e.message : String(e)}`;
    }
    return `attached camera: ${attached ? 'yes (XRTrackedInputDevice.Camera)' : 'none'}\nfixedFoveation: ${foveation}`;
  };
  const attach = (): void => {
    xr.cameraManager.attachCamera(XRTrackedInputDevice.Camera, xrCamera);
    attached = xrCamera;
  };
  const detach = (): void => {
    xr.cameraManager.detachCamera(XRTrackedInputDevice.Camera);
    attached = null;
  };
  if (w.stage.preview) tick(w.root, (_dt, t) => (Math.floor(t / 2.5) % 2 ? detach() : attach()));
  else {
    button(w.stage.bar, 'attachCamera(Camera)', attach);
    button(w.stage.bar, 'detachCamera(Camera)', detach);
  }
  tick(w.root, () => out.text(lines()));
  w.stage.own(detach);
  return w.stage.dispose;
};

export default mount;
