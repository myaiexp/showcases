// inputManager.getTrackedDevice for each XRTrackedInputDevice
import { type XRCamera, type XRController, XRTrackedInputDevice, XRTrackingState } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { room, xrWorld } from '../../shared/xr-kit.ts';

const NAMES = ['Controller', 'LeftController', 'RightController', 'Camera', 'LeftCamera', 'RightCamera'] as const;

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { hint: 'The docs list a "Control" device; in 1.6.13 it is called Controller.' });
  room(w);
  const { inputManager } = w.xr;
  const out = panel(w.stage, 'tl');
  let events = 0;
  const onChange = (added: readonly unknown[], removed: readonly unknown[]): void => void (events += added.length + removed.length);
  inputManager.addTrackedDeviceChangedListener(onChange);
  w.stage.own(() => inputManager.removeTrackedDeviceChangedListener(onChange));
  tick(w.root, () => {
    const rows = NAMES.map((name) => {
      const device = inputManager.getTrackedDevice<XRCamera | XRController>(XRTrackedInputDevice[name]);
      const p = 'pose' in device ? device.pose.position : device.gripPose.position;
      return `${name.padEnd(16)} ${XRTrackingState[device.trackingState].padEnd(12)} ${p ? `${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}` : ''}`;
    });
    out.text(`${rows.join('\n')}\ndevice change events: ${events}`);
  });
  return w.stage.dispose;
};

export default mount;
