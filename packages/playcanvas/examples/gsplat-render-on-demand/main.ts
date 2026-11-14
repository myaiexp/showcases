// Render on demand: autoRender off, frame:request and renderNextFrame
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, galaxyCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  // A card has no input, so its camera drifts: moving the camera is what asks for frames there.
  const scene = await createSplatScene(el, ctx, { distance: 6, pitch: -30, autoRotate: ctx.preview ? 14 : 0 });
  const { app, camera } = scene;
  const container = cloudContainer(scene.stage.device, galaxyCloud(18000, 3, 3));
  const galaxy = scene.add(container, 'galaxy');

  let ticks = 0;
  let rendered = 0;
  let onDemand = false;

  // The splat system raises frame:request when streaming or an async sort produced something to draw.
  const request = (): void => {
    app.renderNextFrame = true;
  };
  app.systems.gsplat!.on('frame:request', request);

  // Camera movement is not covered by frame:request: compare the pose every update.
  const lastPos = new pc.Vec3();
  const lastRot = new pc.Quat();
  app.on('update', () => {
    ticks++;
    const pos = camera.getPosition();
    const rot = camera.getRotation();
    if (!pos.equals(lastPos) || !rot.equals(lastRot)) {
      app.renderNextFrame = true;
      lastPos.copy(pos);
      lastRot.copy(rot);
    }
  });
  // framerender fires just before the app decides whether to draw.
  app.on('framerender', () => {
    if (app.autoRender || app.renderNextFrame) rendered++;
  });

  let autoBox: HTMLInputElement | undefined;
  // Like the docs: render normally while the scene first comes up, then go on demand.
  const gsplatSystem = app.systems.gsplat!;
  const onReady = (_camera: unknown, _layer: unknown, ready: boolean, loadingCount: number): void => {
    if (ready && loadingCount === 0) {
      gsplatSystem.off('frame:ready', onReady);
      onDemand = true;
      app.autoRender = false;
      if (autoBox) autoBox.checked = false;
    }
  };
  gsplatSystem.on('frame:ready', onReady);

  if (!ctx.preview) {
    const panel = createPanel(el);
    const stats = panel.readout();
    panel.slider('Scale (your own change: set renderNextFrame)', 0.5, 1.6, 0.05, 1, (v) => {
      galaxy.setLocalScale(v, v, v);
      app.renderNextFrame = true;
    });
    panel.button('Add a small galaxy', () => {
      const extra = scene.add(container, 'extra');
      extra.setPosition((Math.random() - 0.5) * 4, 0.6, (Math.random() - 0.5) * 4);
      extra.setLocalScale(0.3, 0.3, 0.3);
      app.renderNextFrame = true;
    });
    autoBox = panel.check('autoRender', true, (on) => {
      onDemand = !on;
      app.autoRender = on;
    });
    panel.row();
    panel.readout('Drag the view to render; leave it alone and the frame count stops.');
    app.on('update', () => {
      stats.textContent = `ticks ${ticks}, frames drawn ${rendered}, autoRender ${String(app.autoRender)}${onDemand ? ' (on demand)' : ''}`;
    });
  }

  return () => {
    gsplatSystem.off('frame:request', request);
    gsplatSystem.off('frame:ready', onReady);
    scene.dispose();
  };
};

export default mount;
