// The asset change event: data, file and resource updates, plus name and tags
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, canvasBlob, fileUrl, setMap, textureAsset, tileDrawer } from '../../shared/assets.ts';
import { createLog } from '../../shared/scripting.ts';

const brief = (v: unknown): string => {
  if (v === null || v === undefined) return String(v);
  if (v instanceof pc.Texture) return `Texture ${v.width}x${v.height}`;
  if (typeof v === 'object') return JSON.stringify(v).replace(/blob:[^"]+/, 'blob:...').slice(0, 54);
  return String(v);
};

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 12, orbit: { distance: 7, pitch: -25, yaw: 0, autoRotate: ctx.preview ? 10 : 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  const out = createLog(el, ctx, 9);
  let disposed = false;

  // A 16 pixel tile makes the sampling filter easy to see once it is blown up on a box.
  const make = async (label: string, hue: number): Promise<string> => urls.from(await canvasBlob(tileDrawer(label, hue), 16));
  const first = await make('1', 20);
  if (disposed) return () => scene.dispose();

  const box = addMapBox(app.root, 'badge', [0, 1.1, 0], 2.6);
  const asset = textureAsset('badge', first, 'badge-1.png', ['ui']);
  asset.data = { srgb: true, minfilter: 'linear', magfilter: 'linear', mipmaps: false };
  asset.on('load', () => setMap(box, asset.resource as pc.Texture));
  // 'change' reports the property, the new value and the old one.
  asset.on('change', (_a: pc.Asset, property: string, value: unknown, old: unknown) => {
    out.log(`change: ${property} ${brief(old)} -> ${brief(value)}`);
  });
  asset.on('name', (_a: pc.Asset, name: string, old: string) => out.log(`name: ${old} -> ${name}`));
  registry.add(asset);
  registry.load(asset);

  let n = 1;
  let nearest = false;
  const setFilter = (on: boolean): void => {
    nearest = on;
    const f = on ? 'nearest' : 'linear';
    // Assigning data patches the loaded texture in place; the file is not fetched again.
    asset.data = { ...asset.data, minfilter: f, magfilter: f };
  };
  const swapFile = async (): Promise<void> => {
    const label = String(++n);
    const url = await make(label, (n * 70) % 360);
    if (disposed) return;
    const old = fileUrl(asset);
    // A new file triggers change, then a reload; the load event updates the box.
    asset.file = { url, filename: `badge-${n}.png` };
    if (old) urls.revoke(old);
  };
  const rename = (): void => {
    asset.name = asset.name === 'badge' ? 'badge (renamed)' : 'badge';
    out.log(`  registry.find('badge') -> ${registry.find('badge') ? 'found' : 'null'}`);
  };
  const retag = (): void => {
    if (asset.tags.has('ui')) asset.tags.remove('ui');
    else asset.tags.add('ui');
    out.log(`  findByTag('ui') -> ${registry.findByTag('ui').length} asset(s)`);
  };

  let spin = 0;
  app.on('update', (dt: number) => {
    spin += dt;
    box.setLocalEulerAngles(0, Math.sin(spin * 0.8) * 25, 0);
  });

  if (ctx.preview) {
    let t = 0;
    let step = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 1.4) return;
      t = 0;
      if (step++ % 3 === 2) void swapFile();
      else setFilter(!nearest);
    });
  } else {
    const panel = createPanel(el);
    panel.check('nearest filtering (asset.data)', false, setFilter);
    panel.button('asset.file = new image', () => void swapFile());
    panel.button('asset.name = ...', rename);
    panel.button('tags add / remove', retag);
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
