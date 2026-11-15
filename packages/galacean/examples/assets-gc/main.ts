// resourceManager.gc() releases cached assets that nothing references; referenced ones stay
import { AssetType, type Entity, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { pictureFrame, pngBlobUrl, releaseUrls, tile } from '../../shared/assets-kit.ts';
import { button } from '../../shared/controls.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const COUNT = 6;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Six textures are loaded; the first three are put on materials, the rest are only cached.' });
  const { engine, root } = stage;
  stage.own(releaseUrls);
  lit(stage, [0, 0.5, 8]);
  const info = panel(stage, 'br');
  const rm = engine.resourceManager;
  let urls: string[] = [];
  let textures: Texture2D[] = [];
  let frames: Entity[] = [];
  let collected = false;
  let round = 0;
  const load = async (): Promise<void> => {
    for (const f of frames) f.destroy();
    frames = [];
    collected = false;
    round++;
    urls = await Promise.all(Array.from({ length: COUNT }, (_, i) => pngBlobUrl(64, tile(String(i + 1), ((i + round * 2) * 55) % 360))));
    textures = await Promise.all(urls.map((url) => rm.load<Texture2D>({ type: AssetType.Texture2D, url })));
    if (ctx.signal.aborted) return;
    frames = textures.slice(0, 3).map((t, i) => pictureFrame(root, engine, t, 1.8, [(i - 1) * 2.1, 0.4, 0]));
  };
  await load();
  const collect = (): void => {
    rm.gc();
    collected = true;
  };
  if (!stage.preview) {
    button(stage.bar, 'resourceManager.gc()', collect);
    button(stage.bar, 'Load again', () => void load());
  }
  let last = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 2.4) {
      last = t;
      if (collected) void load();
      else collect();
    }
    frames.forEach((f, i) => f.transform.setRotation(90 - Math.sin(t + i) * 18, 0, 0));
    info.text(
      textures
        .map((tex, i) => `texture ${i + 1}  refCount ${tex.refCount}  ${tex.destroyed ? 'DESTROYED' : 'alive'}${stage.preview ? '' : `  cache ${rm.getFromCache(urls[i]!) ? 'hit' : 'miss'}${i < 3 ? '  (on a material)' : ''}`}`)
        .join('\n') + `\n\n${collected ? 'after gc()' : 'before gc()'}`,
    );
  });
  return stage.dispose;
};

export default mount;
