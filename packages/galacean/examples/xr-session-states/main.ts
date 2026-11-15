// XRSessionState: the lifecycle the docs draw, beside the real (idle) state
import { XRSessionState } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { PALETTE } from '../../shared/core-kit.ts';
import { add, blinn, steps } from '../../shared/gfx-kit.ts';
import { tint } from '../../shared/phys-tag.ts';
import { xrWorld } from '../../shared/xr-kit.ts';

const FLOW: [XRSessionState, string][] = [
  [XRSessionState.None, 'request() starts it'],
  [XRSessionState.Initializing, 'the platform session is being created'],
  [XRSessionState.Initialized, 'ready; autoRun moves on, otherwise call run()'],
  [XRSessionState.Running, 'the frame loop is XR'],
  [XRSessionState.Paused, 'stop() was called; run() resumes, exit ends it'],
];

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { camera: [0, 2, 8], target: [0, 0.6, 0], hint: 'A walkthrough of the enum; the live state is read from the manager.' });
  const out = panel(w.stage, 'tl');
  const cubes = FLOW.map((_step, i) => add(w.root, PrimitiveMesh.createCuboid(w.stage.engine, 1.1, 1.1, 1.1), blinn(w.stage.engine, [...PALETTE.blue]), [(i - 2) * 2, 0.6, 0], 'state').entity);
  steps(w.root, 2, FLOW.length, (i) => {
    cubes.forEach((c, k) => {
      tint(c, k === i ? PALETTE.amber : PALETTE.blue);
      c.transform.setScale(k === i ? 1.25 : 1, k === i ? 1.25 : 1, k === i ? 1.25 : 1);
    });
    const [state, note] = FLOW[i]!;
    out.text(`walk: XRSessionState.${XRSessionState[state]} = ${state}\n${note}\nlive sessionManager.state = ${XRSessionState[w.xr.sessionManager.state]}`);
  });
  return w.stage.dispose;
};

export default mount;
