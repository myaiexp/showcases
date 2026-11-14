// A failed load retries with growing delays; enableRetry sets how many
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { BlobUrls, canvasBlob, textureAsset, tileDrawer } from '../../shared/assets.ts';
import { tint } from '../../shared/scripting.ts';

interface Lane {
  retries: number;
  bar: pc.Entity;
  start: number;
  elapsed: number;
  state: 'idle' | 'loading' | 'failed';
}

const SECONDS = 4;
const WIDTH = 8;

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 8, pitch: -60, yaw: 0, autoRotate: 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  let disposed = false;

  const lanes: Lane[] = [0, 2, 4].map((retries, i) => {
    const bar = addShape(app.root, 'box', material('#4ab3e8'), [-WIDTH / 2, 0.3, (i - 1) * 1.6], [0.01, 0.4, 1], `retries ${retries}`);
    return { retries, bar, start: 0, elapsed: 0, state: 'idle' };
  });
  // A frame marking the full scale of the bars: SECONDS seconds.
  addShape(app.root, 'box', material('#3a4152'), [0, 0.05, 0], [WIDTH + 0.4, 0.1, 5.4], 'scale');

  const blob = await canvasBlob(tileDrawer('?', 200), 64);
  if (disposed) return () => scene.dispose();

  const attempt = (lane: Lane): void => {
    // A blob URL that is revoked before the load: the request fails every time it is tried.
    const url = urls.from(blob);
    urls.revoke(url);
    // enableRetry(n) sets maxRetries on every handler; the load below reads it as it starts.
    if (lane.retries > 0) app.loader.enableRetry(lane.retries);
    else app.loader.disableRetry();
    const asset = textureAsset(`missing ${lane.retries}`, url, 'missing.png');
    lane.state = 'loading';
    lane.start = performance.now();
    lane.elapsed = 0;
    tint(lane.bar, '#f2c14e');
    asset.once('error', () => {
      lane.state = 'failed';
      lane.elapsed = (performance.now() - lane.start) / 1000;
      tint(lane.bar, '#e8794a');
    });
    registry.add(asset);
    registry.load(asset);
  };
  const run = (): void => {
    lanes.forEach(attempt);
    app.loader.disableRetry();
  };

  app.on('update', () => {
    for (const lane of lanes) {
      if (lane.state === 'loading') lane.elapsed = (performance.now() - lane.start) / 1000;
      const w = Math.max(0.01, (Math.min(lane.elapsed, SECONDS) / SECONDS) * WIDTH);
      lane.bar.setLocalScale(w, 0.4, 1);
      lane.bar.setLocalPosition(-WIDTH / 2 + w / 2, 0.3, lane.bar.getLocalPosition().z);
    }
  });
  run();

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > SECONDS + 1.5) {
        t = 0;
        run();
      }
    });
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    app.on('update', () => {
      out.textContent = lanes.map((l) => `${l.retries} retries: ${l.state === 'idle' ? '' : `${l.elapsed.toFixed(2)} s ${l.state}`}`).join('   |   ');
    });
    panel.row();
    panel.slider('third lane retries', 0, 6, 1, 4, (v) => (lanes[2]!.retries = v));
    panel.button('Load the missing images again', run);
  }
  return () => {
    disposed = true;
    app.loader.disableRetry();
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
