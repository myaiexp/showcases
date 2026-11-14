// Registry events (add, load, error, remove) and asset events on textures
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, canvasBlob, setMap, textureAsset, tileDrawer } from '../../shared/assets.ts';
import { createLog, tint } from '../../shared/scripting.ts';

const SLOTS = 6;
const GREY = '#6b7080';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 16, orbit: { distance: 12, pitch: -30, yaw: 0, autoRotate: 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  const out = createLog(el, ctx, 8);

  const tiles = new Map<pc.Asset, { box: pc.Entity; slot: number; leaving: boolean }>();
  const used = new Set<number>();
  let made = 0;

  // The registry reports every asset, each asset reports only itself.
  registry.on('add', (asset: pc.Asset) => {
    out.log(`registry add: ${asset.name}`);
    const slot = [...Array(SLOTS).keys()].find((s) => !used.has(s)) ?? 0;
    used.add(slot);
    const box = addMapBox(app.root, asset.name, [(slot - (SLOTS - 1) / 2) * 2.2, 0.8, 0]);
    tiles.set(asset, { box, slot, leaving: false });
    asset.on('load', () => out.log(`  ${asset.name} asset load`));
    asset.on('error', (err: string) => out.log(`  ${asset.name} asset error: ${String(err).slice(0, 48)}`));
    asset.on('remove', () => out.log(`  ${asset.name} asset remove`));
  });
  registry.on('load', (asset: pc.Asset) => {
    out.log(`registry load: ${asset.name}`);
    setMap(tiles.get(asset)!.box, asset.resource as pc.Texture);
  });
  registry.on('error', (err: string, asset: pc.Asset) => {
    out.log(`registry error: ${asset.name}`);
    tint(tiles.get(asset)!.box, '#e8794a');
  });
  registry.on('remove', (asset: pc.Asset) => {
    out.log(`registry remove: ${asset.name}`);
    const tile = tiles.get(asset);
    if (tile) tile.leaving = true;
  });

  app.on('update', (dt: number) => {
    for (const [asset, tile] of tiles) {
      if (!tile.leaving) continue;
      const s = tile.box.getLocalScale().x;
      const next = s - dt * 3;
      if (next <= 0.05) {
        tile.box.destroy();
        used.delete(tile.slot);
        tiles.delete(asset);
      } else tile.box.setLocalScale(next, next, next);
    }
  });

  let disposed = false;
  const addGood = async (): Promise<void> => {
    const n = made++;
    const blob = await canvasBlob(tileDrawer(String.fromCharCode(65 + (n % 26)), (n * 57) % 360));
    if (disposed) return;
    const asset = textureAsset(`texture ${String.fromCharCode(65 + (n % 26))}`, urls.from(blob), 'tile.png');
    registry.add(asset);
    registry.load(asset);
  };
  const addBroken = (): void => {
    // Bytes that are not an image: the request succeeds, decoding fails.
    const asset = textureAsset(`broken ${made++}`, urls.from(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]), 'image/png'), 'broken.png');
    registry.add(asset);
    registry.load(asset);
  };
  const removeOldest = (): void => {
    const oldest = [...tiles.keys()].find((a) => !tiles.get(a)!.leaving);
    if (oldest) registry.remove(oldest);
  };

  if (ctx.preview) {
    let t = 0;
    let step = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 1.1) return;
      t = 0;
      const live = [...tiles.values()].filter((x) => !x.leaving).length;
      if (live >= 4) removeOldest();
      else if (step++ % 3 === 2) addBroken();
      else void addGood();
    });
  } else {
    const panel = createPanel(el);
    panel.button('add + load a texture', () => void addGood());
    panel.button('add + load a broken image', addBroken);
    panel.button('registry.remove(oldest)', removeOldest);
    void addGood();
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
