// The docs' base64 case: a data URL with an explicit type loads as a Texture2D
import { AssetType, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { pictureFrame, pngDataUrl, tile } from '../../shared/assets-kit.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'A data URL has no file extension, so the type must be given.' });
  const { engine, root } = stage;
  lit(stage, [0, 0, 5]);
  const info = panel(stage, 'bl');
  const url = pngDataUrl(128, tile('64', 20));
  const texture = await engine.resourceManager.load<Texture2D>({ url, type: AssetType.Texture2D });
  if (ctx.signal.aborted) return stage.dispose;
  const frame = pictureFrame(root, engine, texture, 2.6);
  info.text(`load({ url: 'data:image/png;base64,...', type: AssetType.Texture2D })\nurl length ${url.length} characters`);
  tick(root, (dt) => frame.transform.rotate(0, 0, 40 * dt));
  return stage.dispose;
};

export default mount;
