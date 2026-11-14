// A 3DGS .ply built in memory and loaded as a gsplat asset from a blob URL
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createSplatScene } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildPly, plyHeader } from './ply.ts';

const COUNTS = ['2000', '8000', '20000'] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 7, pitch: -15 });
  const { app } = scene;

  let url = '';
  let asset: pc.Asset | null = null;
  let entity: pc.Entity | null = null;
  let token = 0;

  // The loader picks the PLY parser from the file extension, so the blob URL carries one.
  const load = (count: number): void => {
    const mine = ++token;
    entity?.destroy();
    if (asset) {
      asset.unload();
      app.assets.remove(asset);
    }
    if (url) URL.revokeObjectURL(url);
    url = `${URL.createObjectURL(new Blob([buildPly(count) as BlobPart]))}#cloud.ply`;
    asset = new pc.Asset('cloud.ply', 'gsplat', { url, filename: 'cloud.ply' });
    const loaded = asset;
    asset.ready(() => {
      if (mine !== token) return;
      entity = new pc.Entity('ply splat');
      entity.addComponent('gsplat', { asset: loaded });
      app.root.addChild(entity);
    });
    app.assets.add(asset);
    app.assets.load(asset);
  };
  load(ctx.preview ? 6000 : 8000);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('Splats in the file', COUNTS, '8000', (v) => load(Number(v)));
    panel.row();
    const header = document.createElement('pre');
    Object.assign(header.style, { margin: '0', fontSize: '0.75rem', color: 'var(--fg-2)', whiteSpace: 'pre-wrap' });
    header.textContent = plyHeader(8000).replace(/\n/g, ' | ');
    panel.el.append(header);
  }

  return () => {
    token++;
    if (url) URL.revokeObjectURL(url);
    scene.dispose();
  };
};

export default mount;
