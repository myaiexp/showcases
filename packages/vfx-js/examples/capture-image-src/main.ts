// an <img> is loaded once; after changing src, call vfx.update(img)
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { PICTURE_KINDS, picture, pictureUrl } from '../../shared/pictures.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, { shader: 'sinewave' });

  let i = 0;
  const next = async (): Promise<void> => {
    i = (i + 1) % PICTURE_KINDS.length;
    img.src = pictureUrl(PICTURE_KINDS[i]!);
    await img.decode();
    // An <img> is loaded into the texture once. A new src needs update(img).
    await vfx.update(img);
    stage.say(`img.src = ${PICTURE_KINDS[i]}; await vfx.update(img)`);
  };
  if (stage.bar) button(stage.bar, 'Next picture', () => void next());
  else stage.every(2200, () => void next());
  stage.say('img.src = landscape');
  return () => stage.dispose();
};

export default mount;
