// PNG, JPEG and WebP encoded in the browser and loaded as texture assets
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, canvasBlob, fileUrl, setMap, textureAsset, type Drawer } from '../../shared/assets.ts';

// Fine detail and hard edges, where lossy formats show their artefacts.
const detail: Drawer = (g, size) => {
  const bg = g.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 1.2);
  bg.addColorStop(0, '#ffe08a');
  bg.addColorStop(1, '#2a3a6a');
  g.fillStyle = bg;
  g.fillRect(0, 0, size, size);
  g.strokeStyle = '#fff';
  g.lineWidth = 1;
  for (let i = 0; i < size; i += 6) {
    g.beginPath();
    g.moveTo(i, 0);
    g.lineTo(size - i, size);
    g.stroke();
  }
  g.fillStyle = '#e8794a';
  g.fillRect(size * 0.2, size * 0.42, size * 0.6, size * 0.16);
  g.fillStyle = '#000';
  g.font = `bold ${Math.round(size / 7)}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('format test', size / 2, size / 2);
};

const FORMATS = [
  { type: 'image/png', ext: 'png' },
  { type: 'image/jpeg', ext: 'jpg' },
  { type: 'image/webp', ext: 'webp' },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 9, pitch: -22, yaw: 0, autoRotate: ctx.preview ? 8 : 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  let disposed = false;
  let quality = 0.6;

  const boxes = FORMATS.map((f, i) => addMapBox(app.root, f.ext, [(i - 1) * 3.2, 1, 0], 2.6));
  const current: (pc.Asset | null)[] = FORMATS.map(() => null);
  const sizes: string[] = FORMATS.map(() => '');
  let readout: HTMLElement | null = null;

  const build = async (): Promise<void> => {
    const blobs = await Promise.all(FORMATS.map((f) => canvasBlob(detail, 256, f.type, quality)));
    if (disposed) return;
    blobs.forEach((blob, i) => {
      const f = FORMATS[i]!;
      const old = current[i];
      // The browser falls back to PNG for a type it cannot encode, and says so in blob.type.
      const real = blob.type.replace('image/', '');
      const asset = textureAsset(`${f.ext} texture`, urls.from(blob), `detail.${f.ext}`);
      asset.on('load', () => {
        setMap(boxes[i]!, asset.resource as pc.Texture);
        // The box has switched over, so the previous asset can go.
        if (old) {
          registry.remove(old);
          old.unload();
          urls.revoke(fileUrl(old)!);
        }
      });
      registry.add(asset);
      registry.load(asset);
      current[i] = asset;
      sizes[i] = `${f.ext}${real === f.ext || (f.ext === 'jpg' && real === 'jpeg') ? '' : ` (browser gave ${real})`}: ${(blob.size / 1024).toFixed(1)} KB`;
    });
    if (readout) readout.textContent = sizes.join('   |   ');
  };
  await build();

  if (ctx.preview) {
    let t = 0;
    let busy = false;
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 1 || busy) return;
      t = 0;
      busy = true;
      quality = 0.05 + Math.abs(Math.sin(performance.now() / 2500)) * 0.9;
      void build().finally(() => (busy = false));
    });
  } else {
    const panel = createPanel(el);
    readout = panel.readout(sizes.join('   |   '));
    panel.row();
    panel.slider('JPEG and WebP quality', 0.05, 1, 0.05, quality, (v) => {
      quality = v;
      void build();
    });
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
