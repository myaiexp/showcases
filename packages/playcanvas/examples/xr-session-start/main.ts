// app.xr support checks, availability events and startXr from a button click
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape } from '../../shared/xr.ts';

const SPACES = [pc.XRSPACE_LOCALFLOOR, pc.XRSPACE_LOCAL, pc.XRSPACE_BOUNDEDFLOOR, pc.XRSPACE_UNBOUNDED, pc.XRSPACE_VIEWER] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx);
  const { app, camera } = scene;

  // Something to look at in the play area, a metre or two in front of the viewer.
  const cube = xrShape(app.root, 'box', xrMaterial('#e8794a'), [0, 1.1, -1.5], 0.5);
  const ball = xrShape(app.root, 'sphere', xrMaterial('#4ab3e8'), [-0.9, 0.5, -1.2], 0.5);
  const pillar = xrShape(app.root, 'cylinder', xrMaterial('#7bc67b'), [0.9, 0.6, -1.4], [0.35, 1.2, 0.35]);
  for (const e of [cube, ball, pillar]) e.render!.castShadows = true;
  app.on('update', (dt: number) => cube.rotate(0, 40 * dt, 0));

  if (ctx.preview) return () => scene.dispose();

  const panel = createPanel(el);
  let space: string = pc.XRSPACE_LOCALFLOOR;
  panel.select('reference space', SPACES, pc.XRSPACE_LOCALFLOOR, (v) => (space = v));
  const log = panel.readout('');
  panel.row();
  // The entries read `space` when they are clicked, so the select above applies.
  const entry = addXrEntry(el, panel, scene, [
    { type: pc.XRTYPE_VR, get space() { return space; }, label: 'Enter VR' },
    { type: pc.XRTYPE_AR, get space() { return space; }, label: 'Enter AR' },
  ]);

  // An AR session is blended over the camera feed, so its clear colour must be transparent.
  const clear = camera.camera!.clearColor.clone();
  const onStart = (): void => {
    camera.camera!.clearColor = new pc.Color(clear.r, clear.g, clear.b, app.xr!.type === pc.XRTYPE_AR ? 0 : 1);
  };
  const onEnd = (): void => {
    camera.camera!.clearColor = clear;
  };
  app.xr?.on('start', onStart);
  app.xr?.on('end', onEnd);

  const describe = (): string => {
    const xr = app.xr;
    const flag = (b: boolean | undefined): string => (b ? 'yes' : 'no');
    return `supported: ${flag(xr?.supported)}, VR available: ${flag(xr?.isAvailable(pc.XRTYPE_VR))}, AR available: ${flag(xr?.isAvailable(pc.XRTYPE_AR))}`;
  };
  log.textContent = describe();
  const onAvailable = (type: string, available: boolean): void => {
    log.textContent = `${describe()} (xr:available ${type} -> ${available})`;
  };
  app.xr?.on('available', onAvailable);

  return () => {
    app.xr?.off('available', onAvailable);
    app.xr?.off('start', onStart);
    app.xr?.off('end', onEnd);
    if (app.xr?.active) app.xr.end();
    entry.dispose();
    scene.dispose();
  };
};

export default mount;
