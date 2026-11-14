// Loading a group of assets by tag and acting once the whole group is in
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, canvasBlob, setMap, textureAsset, tileDrawer } from '../../shared/assets.ts';

// Two levels of four textures; half of each are also tagged 'enemy'.
const LAYOUT = [
  { tags: ['level-1', 'prop'], label: 'a' },
  { tags: ['level-1', 'enemy'], label: 'b' },
  { tags: ['level-1', 'prop'], label: 'c' },
  { tags: ['level-1', 'enemy'], label: 'd' },
  { tags: ['level-2', 'enemy'], label: 'e' },
  { tags: ['level-2', 'prop'], label: 'f' },
  { tags: ['level-2', 'enemy'], label: 'g' },
  { tags: ['level-2', 'prop'], label: 'h' },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 11, pitch: -40, autoRotate: 0, yaw: 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  const timers = new Set<number>();
  let disposed = false;

  const blobs = await Promise.all(LAYOUT.map((s, i) => canvasBlob(tileDrawer(s.label, i * 45))));
  if (disposed) return () => scene.dispose();
  const boxes = new Map<pc.Asset, pc.Entity>();
  LAYOUT.forEach((spec, i) => {
    const asset = textureAsset(`tile ${spec.label}`, urls.from(blobs[i]!), `${spec.label}.png`, spec.tags);
    registry.add(asset);
    const row = spec.tags[0] === 'level-1' ? -1.6 : 1.6;
    boxes.set(asset, addMapBox(app.root, asset.name, [((i % 4) - 1.5) * 2.2, 0.8, row]));
  });

  const status = { text: '' };
  const publish = (): void => {
    status.text = `loaded ${[...boxes.keys()].filter((a) => a.loaded).length} of ${boxes.size}`;
  };

  // The loop from the preloading guide: count loads and act when the last one lands.
  const loadGroup = (...query: (string | string[])[]): void => {
    const assets = registry.findByTag(...query).filter((a) => !a.loaded);
    let loadedCount = 0;
    if (assets.length === 0) return;
    assets.forEach((asset, n) => {
      asset.once('load', () => {
        setMap(boxes.get(asset)!, asset.resource as pc.Texture);
        loadedCount++;
        publish();
        if (loadedCount === assets.length) cheer(assets);
      });
      // Staggered so the progress is visible; each load itself is just registry.load.
      const id = window.setTimeout(() => {
        timers.delete(id);
        registry.load(asset);
      }, n * 260);
      timers.add(id);
    });
  };
  const unloadAll = (): void => {
    for (const [asset, box] of boxes) {
      setMap(box, null);
      asset.unload();
    }
    publish();
  };

  // "startLevel": the group hops once everything in it is loaded.
  const hops = new Map<pc.Entity, number>();
  const cheer = (assets: pc.Asset[]): void => assets.forEach((a) => hops.set(boxes.get(a)!, 0));
  app.on('update', (dt: number) => {
    for (const [box, t] of hops) {
      const next = t + dt * 5;
      const p = box.getLocalPosition();
      box.setLocalPosition(p.x, 0.8 + Math.abs(Math.sin(next)) * 0.9, p.z);
      if (next > Math.PI * 2) {
        hops.delete(box);
        box.setLocalPosition(p.x, 0.8, p.z);
      } else hops.set(box, next);
    }
  });

  if (ctx.preview) {
    const script: (() => void)[] = [() => loadGroup('level-1'), () => loadGroup('level-2'), unloadAll];
    let t = 0;
    let i = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2.3) {
        t = 0;
        script[i++ % script.length]!();
      }
    });
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    app.on('update', () => (out.textContent = status.text));
    publish();
    panel.row();
    panel.button("findByTag('level-1')", () => loadGroup('level-1'));
    panel.button("findByTag('level-2')", () => loadGroup('level-2'));
    panel.button("findByTag(['level-1', 'enemy'])", () => loadGroup(['level-1', 'enemy']));
    panel.button("findByTag('prop', 'enemy')", () => loadGroup('prop', 'enemy'));
    panel.button('unload all', unloadAll);
  }
  return () => {
    disposed = true;
    timers.forEach((id) => clearTimeout(id));
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
