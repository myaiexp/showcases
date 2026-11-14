// vfx.add and vfx.remove on one picture, add awaited before remove
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  let added = false;
  let busy = false;
  const toggle = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    if (added) {
      // Stop drawing and restore the element's opacity.
      vfx.remove(img);
      stage.say('vfx.remove(img): the plain <img> again');
    } else {
      // add is async: await it before calling remove on the same element.
      await vfx.add(img, { shader: 'pixelate' });
      stage.say('await vfx.add(img, { shader: "pixelate" })');
    }
    added = !added;
    busy = false;
  };

  if (stage.bar) button(stage.bar, 'Add / remove', () => void toggle());
  else stage.every(2000, () => void toggle());
  await toggle();
  return () => stage.dispose();
};

export default mount;
