// asset.ready, registry.load and the two loadFromUrl methods on blob textures
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, canvasBlob, fileUrl, setMap, textureAsset, tileDrawer } from '../../shared/assets.ts';
import { createLog } from '../../shared/scripting.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 10, pitch: -28, yaw: 0, autoRotate: ctx.preview ? 8 : 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  const out = createLog(el, ctx, 9);
  let disposed = false;

  const boxes = [
    addMapBox(app.root, 'ready then load', [-4.5, 0.8, 0]),
    addMapBox(app.root, 'loadFromUrl', [-1.5, 0.8, 0]),
    addMapBox(app.root, 'loadFromUrlAndFilename', [1.5, 0.8, 0]),
    addMapBox(app.root, 'ready when loaded', [4.5, 0.8, 0]),
  ];
  let t0 = performance.now();
  const say = (text: string): void => out.log(`${String(Math.round(performance.now() - t0)).padStart(4)} ms  ${text}`);

  const run = async (): Promise<void> => {
    const old = registry.list();
    old.forEach((a) => registry.remove(a));
    old.forEach((a) => a.unload());
    boxes.forEach((b) => setMap(b, null));
    out.clear();
    t0 = performance.now();

    const blobs = await Promise.all([0, 1, 2, 3].map((i) => canvasBlob(tileDrawer(String(i + 1), 20 + i * 80))));
    if (disposed) return;
    const [u0, u1, u2, u3] = blobs.map((b) => urls.from(b)) as [string, string, string, string];

    // 1. Register the callback first; it runs once the load finishes.
    const first = textureAsset('first', u0, 'first.png');
    first.ready((asset: pc.Asset) => {
      say("ready() callback ran for 'first'");
      setMap(boxes[0]!, asset.resource as pc.Texture);
    });
    say("asset 'first' created, ready() registered, loaded = " + first.loaded);
    registry.add(first);
    registry.load(first);

    // 2. loadFromUrl creates the asset, adds it to the registry and loads it.
    registry.loadFromUrl(u1, 'texture', (err, asset) => {
      if (err || !asset) return say(`loadFromUrl failed: ${err}`);
      say(`loadFromUrl done: registry now holds '${asset.name.slice(0, 12)}...' (${registry.list().length} assets)`);
      setMap(boxes[1]!, asset.resource as pc.Texture);
    });

    // 3. The same with a file name, which names the asset and picks the parser.
    registry.loadFromUrlAndFilename(u2, 'sparkle.png', 'texture', (err, asset) => {
      if (err || !asset) return say(`loadFromUrlAndFilename failed: ${err}`);
      say(`loadFromUrlAndFilename done: asset named '${asset.name}'`);
      setMap(boxes[2]!, asset.resource as pc.Texture);
    });

    // 4. Loaded first, then ready(): the callback runs immediately.
    const fourth = textureAsset('fourth', u3, 'fourth.png');
    registry.add(fourth);
    fourth.once('load', () => {
      say("'fourth' loaded; calling ready() now");
      fourth.ready((asset: pc.Asset) => {
        say('ready() ran at once, in the same call');
        setMap(boxes[3]!, asset.resource as pc.Texture);
      });
    });
    registry.load(fourth);
  };
  await run();

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 4) {
        t = 0;
        void run();
      }
    });
  } else {
    const panel = createPanel(el);
    panel.button('Run again with new textures', () => void run());
    panel.button('loadFromUrl on a URL that is already loaded', () => {
      const known = registry.list().find((a) => fileUrl(a));
      if (!known) return;
      say('loadFromUrl again with a known URL...');
      registry.loadFromUrl(fileUrl(known)!, 'texture', () => say('...callback ran at once, no second load'));
    });
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
