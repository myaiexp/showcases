// VFX-JS example: the "slitScanReveal" scroll reveal preset
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { cardScroll, scrollRoom } from '../../shared/scroll-sim.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the page to move the picture out of the window and back in.' });
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  if (ctx.preview) {
    // A card cannot scroll the page: its own box stands in for the viewport.
    stage.root.append(img);
    await cardScroll(stage, vfx, img, { shader: 'slitScanReveal' });
  } else {
    scrollRoom(stage, img);
    await vfx.add(img, { shader: 'slitScanReveal' });
  }
  stage.say('shader: "slitScanReveal"');
  return () => stage.dispose();
};

export default mount;
