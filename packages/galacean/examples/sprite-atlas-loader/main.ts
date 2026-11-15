// A SpriteAtlas loaded with AssetType.SpriteAtlas: getSprite, getSprites
import { AssetType, type SpriteAtlas, Sprite } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { jsonBlobUrl, pngDataUrl, releaseUrls } from '../../shared/assets-kit.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { place, scene2d } from '../../shared/twod-kit.ts';

const NAMES = ['hero', 'coin', 'coin', 'gem'];

/** A 256 x 64 atlas image with four 64 px cells. */
const art = (g: CanvasRenderingContext2D): void => {
  const cells: [string, string][] = [['#d9534f', 'H'], ['#e8b923', '$'], ['#f0d060', '$'], ['#3aa7d9', 'G']];
  cells.forEach(([c, t], i) => {
    g.fillStyle = c;
    g.fillRect(i * 64 + 4, 4, 56, 56);
    g.fillStyle = '#fff';
    g.font = 'bold 34px sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(t, i * 64 + 32, 34);
  });
};

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  stage.own(releaseUrls);
  const say = caption(stage, 'loading an atlas...');
  const img = pngDataUrl(256, art); // a data URL: the loader resolves relative names against the .atlas URL, which a blob URL can't be
  // The .atlas file is JSON: one atlas item per texture, with a sprite entry per cell (pixels).
  const url = jsonBlobUrl({
    atlasItems: [{ img, sprites: NAMES.map((name, i) => ({ name, atlasRegion: { x: i * 64, y: 0, w: 64, h: 64 }, region: { x: 0, y: 0, w: 1, h: 1 }, pivot: { x: 0.5, y: 0.5 } })) }],
  });
  const atlas = await engine.resourceManager.load<SpriteAtlas>({ url, type: AssetType.SpriteAtlas });
  if (engine.destroyed) return stage.dispose;
  const all = atlas.sprites;
  const coins = atlas.getSprites('coin', []);
  const hero = atlas.getSprite('hero');
  all.forEach((s: Sprite, i: number) => place(root, s, -2.1 + i * 1.4, 1, 1.1, 1.1, `sprite${i}`));
  place(root, hero, -1.4, -1, 1.5, 1.5, 'hero');
  const coin = place(root, coins[0]!, 1.2, -1, 1.5, 1.5, 'coin');
  const text = `atlas.sprites ${all.length} | getSprite('hero') | getSprites('coin') -> ${coins.length}`;
  say(text);
  steps(root, 0.5, coins.length, (i) => (coin.sprite = coins[i]!));
  return stage.dispose;
};

export default mount;
