// enterXR on a button click, with the refusal reason and session-state listener
import { XRSessionMode, XRSessionState } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { room, xrWorld } from '../../shared/xr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { hint: 'WebXR needs a button click and an HTTPS page.' });
  room(w);
  const { xr } = w;
  const out = panel(w.stage, 'tl');
  let note = 'no session requested';
  const render = (): void => out.text(`sessionManager.state = ${XRSessionState[xr.sessionManager.state]}\n${note}`);
  const onState = (state: XRSessionState): void => {
    note = `state changed -> ${XRSessionState[state]}`;
    render();
  };
  xr.sessionManager.addStateChangedListener(onState);
  w.stage.own(() => xr.sessionManager.removeStateChangedListener(onState));
  render();
  if (!w.stage.preview) {
    for (const [name, mode] of [['AR', XRSessionMode.AR], ['VR', XRSessionMode.VR]] as const) {
      button(w.stage.bar, `Enter ${name}`, () => {
        note = `enterXR(${name}) ...`;
        render();
        xr.enterXR(mode).then(
          () => {
            note = `${name} session running`;
            render();
          },
          (e: unknown) => {
            note = `cannot start ${name}: ${e instanceof Error ? e.message : String(e)}`;
            render();
          },
        );
      });
    }
    button(w.stage.bar, 'Exit XR', () => {
      xr.exitXR().then(
        () => {
          note = 'exited';
          render();
        },
        (e: unknown) => {
          note = `exitXR: ${e instanceof Error ? e.message : String(e)}`;
          render();
        },
      );
    });
  }
  return w.stage.dispose;
};

export default mount;
