// asset.unload frees the resource, registry.remove drops the asset itself
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, canvasBlob, setMap, textureAsset, tileDrawer } from '../../shared/assets.ts';
import { createLog } from '../../shared/scripting.ts';

const NAMES = ['alpha', 'beta', 'gamma'];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 12, orbit: { distance: 9, pitch: -28, autoRotate: ctx.preview ? 8 : 0, yaw: 0 } });
  const { app, stage } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  const out = createLog(el, ctx, 5);
  let disposed = false;

  const baseline = stage.device.textures.size;
  const blobs = await Promise.all(NAMES.map((_, i) => canvasBlob(tileDrawer(NAMES[i]![0]!.toUpperCase(), 30 + i * 110))));
  if (disposed) return () => scene.dispose();

  const items = NAMES.map((name, i) => {
    const asset = textureAsset(name, urls.from(blobs[i]!), `${name}.png`);
    const box = addMapBox(app.root, name, [(i - 1) * 3, 0.9, 0], 1.8);
    asset.on('load', () => setMap(box, asset.resource as pc.Texture));
    asset.on('unload', () => out.log(`${name}: unload event, resource destroyed`));
    asset.on('remove', () => out.log(`${name}: remove event, no longer in the registry`));
    registry.add(asset);
    registry.load(asset);
    return { asset, box };
  });

  const inRegistry = (i: number): boolean => registry.get(items[i]!.asset.id) !== undefined;

  // Unloading keeps the asset in the registry, so it can be loaded again.
  const unload = (i: number): void => {
    const { asset, box } = items[i]!;
    setMap(box, null);
    asset.unload();
  };
  const load = (i: number): void => {
    const { asset } = items[i]!;
    // A removed asset has to be added again before it can be found or loaded by id.
    if (!inRegistry(i)) registry.add(asset);
    registry.load(asset);
  };
  // Removing deletes the entry; unload first if the memory should go too.
  const remove = (i: number): void => {
    const { asset, box } = items[i]!;
    setMap(box, null);
    asset.unload();
    registry.remove(asset);
  };
  const describe = (): string =>
    items
      .map(({ asset }, i) => `${asset.name}: loaded=${asset.loaded} resource=${asset.resource ? 'yes' : 'no'} in registry=${inRegistry(i)}`)
      .join('   ');

  if (ctx.preview) {
    let t = 0;
    let step = 0;
    const plan: (() => void)[] = [() => unload(0), () => unload(1), () => remove(2), () => load(0), () => load(1), () => load(2)];
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 1) {
        t = 0;
        plan[step++ % plan.length]!();
      }
    });
  } else {
    const panel = createPanel(el);
    const state = panel.readout();
    const tex = panel.readout();
    app.on('update', () => {
      state.textContent = describe();
      tex.textContent = `GPU textures this app holds beyond its baseline: ${stage.device.textures.size - baseline}`;
    });
    NAMES.forEach((name, i) => {
      panel.row();
      panel.button(`${name}.unload()`, () => unload(i));
      panel.button(`registry.load(${name})`, () => load(i));
      panel.button(`registry.remove(${name})`, () => remove(i));
    });
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
