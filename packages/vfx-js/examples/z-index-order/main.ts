// the zIndex option orders overlapping elements inside the canvas
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const w = ctx.preview ? 150 : 300;
  const a = await picture('city', w);
  const b = await picture('flowers', w);
  // Overlap the two pictures by a third.
  b.style.marginLeft = `${-w / 3}px`;
  b.style.marginTop = `${w / 4}px`;
  stage.root.style.gap = '0';
  stage.root.append(a, b);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  let cityOnTop = false;
  const apply = async (): Promise<void> => {
    vfx.remove(a);
    vfx.remove(b);
    // Drawn in ascending zIndex; equal values draw in the order they were added.
    await vfx.add(a, { shader: 'rgbShift', zIndex: cityOnTop ? 1 : 0 });
    await vfx.add(b, { shader: 'rgbShift', zIndex: cityOnTop ? 0 : 1 });
    stage.say(cityOnTop ? 'city zIndex 1, flowers 0: the city draws last, on top' : 'city zIndex 0, flowers 1: the flowers draw on top');
  };
  const swap = (): void => {
    cityOnTop = !cityOnTop;
    void apply();
  };
  if (stage.bar) button(stage.bar, 'Swap zIndex', swap);
  else stage.every(2200, swap);
  await apply();
  return () => stage.dispose();
};

export default mount;
