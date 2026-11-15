// A PNG drawn in code, turned into a blob URL and loaded through resourceManager.load as a Texture2D
import { AssetType, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { pictureFrame, pngBlobUrl, releaseUrls, tile } from '../../shared/assets-kit.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'No network: the image is a blob URL made from a canvas.' });
  const { engine, root } = stage;
  stage.own(releaseUrls);
  lit(stage, [0, 0, 5]);
  const info = panel(stage, 'bl');
  const url = await pngBlobUrl(256, tile('A', 210));
  const texture = await engine.resourceManager.load<Texture2D>({ type: AssetType.Texture2D, url });
  if (ctx.signal.aborted) return stage.dispose;
  const frame = pictureFrame(root, engine, texture, 2.6);
  info.text(`load({ type: AssetType.Texture2D, url })\n${url.slice(0, 34)}...\n-> Texture2D ${texture.width} x ${texture.height}`);
  tick(root, (_dt, t) => frame.transform.setRotation(90 - Math.sin(t) * 25, Math.cos(t * 0.7) * 30, 0));
  return stage.dispose;
};

export default mount;
