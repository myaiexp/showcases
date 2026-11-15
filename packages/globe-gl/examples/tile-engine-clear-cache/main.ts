// globeTileEngineClearCache: drop loaded tiles so a new URL function takes effect
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { paintedTiles, type TileStyle } from '../../shared/tiles.ts';

const STYLES: TileStyle[] = ['dark', 'light', 'grid'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each style is its own URL function; clearing the cache makes the engine fetch every tile again.' });

  let i = 0;
  const globe = stage.own(new Globe(stage.container)).globeTileEngineUrl(paintedTiles(STYLES[0]));
  globe.controls().autoRotate = true;

  const next = (): void => {
    i = (i + 1) % STYLES.length;
    globe.globeTileEngineUrl(paintedTiles(STYLES[i]));
    // Tiles already on the globe stay until the cache is cleared.
    globe.globeTileEngineClearCache();
  };
  if (stage.bar) button(stage.bar, 'Next style + clear cache', next);
  else stage.every(2500, next);

  return stage.dispose;
};

export default mount;
