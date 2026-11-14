// GsplatImage: a canvas texture shown as one splat per visible pixel
import * as pc from 'playcanvas';
// @ts-expect-error untyped module
import { GSplatImage } from 'playcanvas/scripts/esm/gsplat/gsplat-image.mjs';
import type { Mount } from '@/types.ts';
import { createSplatScene } from '../../shared/gsplat.ts';
import { sway } from '../../shared/pbr.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture } from '../../shared/textures.ts';

interface ImageSplat {
  imageAsset: pc.Asset | undefined;
}

const SIZE = 96;

/** Three pictures with transparent corners: the splat count follows the opaque pixels. */
const PICTURES: Record<string, (g: CanvasRenderingContext2D, s: number) => void> = {
  rings: (g, s) => {
    for (let i = 6; i > 0; i--) {
      g.fillStyle = `hsl(${i * 48}, 80%, ${45 + i * 3}%)`;
      g.beginPath();
      g.arc(s / 2, s / 2, (s / 2) * (i / 6), 0, Math.PI * 2);
      g.fill();
    }
  },
  sun: (g, s) => {
    const grad = g.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2);
    grad.addColorStop(0, '#fff7c2');
    grad.addColorStop(0.5, '#ffb347');
    grad.addColorStop(1, 'rgba(255,90,60,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  },
  stripes: (g, s) => {
    g.fillStyle = '#4ad0c4';
    for (let y = 0; y < s; y += 12) {
      g.fillRect(s * 0.1, y, s * 0.8, 7);
      g.fillStyle = y % 24 ? '#4ad0c4' : '#f26ca7';
    }
  },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 3.4, pitch: -8, yaw: 0 });
  const { app, stage } = scene;
  sway(app, scene.orbit, 28, 0.6);

  // The script wants a texture asset: wrap each texture in an Asset that already holds it.
  const textures: pc.Texture[] = [];
  const assets = new Map<string, pc.Asset>();
  for (const [name, draw] of Object.entries(PICTURES)) {
    const texture = canvasTexture(stage.device, draw, { size: SIZE, name, mipmaps: false });
    textures.push(texture);
    const asset = new pc.Asset(name, 'texture');
    asset.resource = texture;
    app.assets.add(asset);
    assets.set(name, asset);
  }

  // The image lies on the XZ plane; turning it -90 degrees about X stands it up facing +Z.
  const entity = new pc.Entity('image');
  entity.setLocalScale(2.6, 2.6, 2.6);
  entity.setEulerAngles(-90, 0, 0);
  app.root.addChild(entity);
  entity.addComponent('script');
  const imageSplat = entity.script!.create(GSplatImage) as unknown as ImageSplat;
  imageSplat.imageAsset = assets.get('rings');

  if (ctx.preview) {
    // Cards cycle through the pictures on their own.
    const names = [...assets.keys()];
    let t = 0;
    let i = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2.5) {
        t = 0;
        imageSplat.imageAsset = assets.get(names[++i % names.length]!);
      }
    });
  } else {
    const panel = createPanel(el);
    panel.select('imageAsset', Object.keys(PICTURES), 'rings', (name) => (imageSplat.imageAsset = assets.get(name)));
    panel.slider('Scale', 1, 4, 0.1, 2.6, (v) => entity.setLocalScale(v, v, v));
    panel.readout(`${SIZE}x${SIZE} texture: one splat per non-transparent pixel`);
  }

  return () => {
    scene.dispose();
    for (const t of textures) t.destroy();
  };
};

export default mount;
