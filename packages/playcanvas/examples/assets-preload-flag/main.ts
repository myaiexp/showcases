// The preload flag: preloaded assets are ready before initialize, others stream
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, canvasBlob, setMap, textureAsset, tileDrawer } from '../../shared/assets.ts';
import { createLog } from '../../shared/scripting.ts';

// Shows its asset's texture as soon as the asset is ready, whenever that is.
class Crate extends pc.Script {
  static override scriptName = 'crate';
  asset!: pc.Asset;

  initialize(): void {
    const state = this.asset.resource ? 'resource ready' : 'resource still null';
    this.app.fire('log', `initialize: ${this.entity.name}, ${state}`);
    this.asset.ready((asset: pc.Asset) => setMap(this.entity, asset.resource as pc.Texture));
  }
  update(dt: number): void {
    this.entity.rotate(0, 25 * dt, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  // manualStart: the example starts the app itself once the preloaded assets are in.
  const scene = await createScene(el, ctx, { floor: 14, manualStart: true, orbit: { distance: 10, pitch: -26, autoRotate: 0, yaw: 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  const out = createLog(el, ctx, 11);
  let disposed = false;
  app.on('log', out.log);

  const bar = document.createElement('div');
  if (!ctx.preview) {
    Object.assign(bar.style, { height: '4px', width: '0%', background: 'var(--accent)', transition: 'width 0.15s' });
    el.append(bar);
  }
  for (const name of ['preload:start', 'preload:end']) app.on(name, () => out.log(`app event ${name}`));
  app.on('preload:progress', (p: number) => {
    out.log(`app event preload:progress ${p.toFixed(2)}`);
    bar.style.width = `${p * 100}%`;
  });

  const FLAGS = [true, true, false, true, false];
  const blobs = await Promise.all(FLAGS.map((_, i) => canvasBlob(tileDrawer(FLAGS[i] ? 'P' : 'S', FLAGS[i] ? 150 : 20 + i * 20))));
  if (disposed) return () => scene.dispose();

  const crates = FLAGS.map((preload, i) => {
    const asset = textureAsset(`${preload ? 'preloaded' : 'streamed'} ${i}`, urls.from(blobs[i]!), 'tile.png');
    asset.preload = preload;
    registry.add(asset);
    const box = addMapBox(app.root, asset.name, [(i - 2) * 2.2, 0.8, 0], 1.6);
    box.addComponent('script');
    return asset;
  });

  // preload() loads every asset flagged preload and reports progress; start() follows it.
  app.preload(() => {
    if (disposed) return;
    // Scripts created now initialize with the preloaded resources already in place.
    crates.forEach((asset) => (app.root.findByName(asset.name) as pc.Entity).script!.create(Crate, { properties: { asset } }));
    app.start();
  });

  const streamed = crates.filter((a) => !a.preload);
  const stream = (): void => streamed.forEach((a) => registry.load(a));
  const drop = (): void =>
    streamed.forEach((a) => {
      const box = app.root.findByName(a.name) as pc.Entity;
      setMap(box, null);
      a.unload();
    });

  if (ctx.preview) {
    let t = 0;
    let phase = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 1.6) return;
      t = 0;
      if (phase++ % 2 === 0) stream();
      else drop();
    });
  } else {
    const panel = createPanel(el);
    panel.button('load the streamed assets', stream);
    panel.button('unload them again', drop);
    const flags = panel.readout();
    app.on('update', () => {
      flags.textContent = crates.map((a) => `${a.name}: ${a.loaded ? 'loaded' : 'not loaded'}`).join(' | ');
    });
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
