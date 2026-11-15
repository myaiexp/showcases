// XRController: gripPose and button queries, fed here with simulated data
import { PrimitiveMesh, Quaternion } from '@galacean/engine';
import { type XRController, XRInputButton, XRTrackedInputDevice } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { PALETTE } from '../../shared/core-kit.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { tint } from '../../shared/phys-tag.ts';
import { room, xrWorld } from '../../shared/xr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { camera: [2.5, 2, 4], target: [0, 1.1, 0], hint: 'Simulated data: there is no controller to ask.' });
  room(w);
  const controller = w.xr.inputManager.getTrackedDevice<XRController>(XRTrackedInputDevice.LeftController);
  const model = add(w.origin, PrimitiveMesh.createCuboid(w.stage.engine, 0.1, 0.06, 0.22), blinn(w.stage.engine, [...PALETTE.violet]), [0, 1, 0], 'left controller').entity;
  const out = panel(w.stage, 'tl');
  const q = new Quaternion();
  let previous = 0;
  tick(w.root, (_dt, t) => {
    // What the platform would write each frame: pose and the held buttons.
    controller.gripPose.position.set(Math.sin(t) * 0.5, 1.1 + Math.sin(t * 2) * 0.2, Math.cos(t) * 0.4);
    controller.gripPose.rotation.copyFrom(q.set(0, 0, 0, 1).rotateY(t).rotateX(Math.sin(t * 1.5) * 0.5));
    const held = (Math.floor(t / 1.5) % 4 === 1 ? XRInputButton.Select : 0) | (Math.floor(t / 1.5) % 4 === 3 ? XRInputButton.Squeeze : 0);
    controller.down = held & ~previous;
    controller.up = previous & ~held;
    controller.pressedButtons = held;
    previous = held;
    // What a script then reads, the way the docs do.
    model.transform.position = controller.gripPose.position;
    model.transform.rotationQuaternion = controller.gripPose.rotation;
    const select = controller.isButtonHeldDown(XRInputButton.Select);
    const squeeze = controller.isButtonHeldDown(XRInputButton.Squeeze);
    tint(model, select ? PALETTE.red : squeeze ? PALETTE.green : PALETTE.violet);
    out.text(
      `gripPose.position ${controller.gripPose.position.x.toFixed(2)}, ${controller.gripPose.position.y.toFixed(2)}, ${controller.gripPose.position.z.toFixed(2)}\nSelect: down ${controller.isButtonDown(XRInputButton.Select)} held ${select} up ${controller.isButtonUp(XRInputButton.Select)}\nSqueeze: down ${controller.isButtonDown(XRInputButton.Squeeze)} held ${squeeze} up ${controller.isButtonUp(XRInputButton.Squeeze)}`,
    );
  });
  return w.stage.dispose;
};

export default mount;
