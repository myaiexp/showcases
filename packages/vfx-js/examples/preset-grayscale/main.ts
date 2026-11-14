// VFX-JS example: the "grayscale" shader preset
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(subject);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A preset name in place of GLSL.
  await vfx.add(subject, { shader: 'grayscale' });
  stage.say('shader: "grayscale"');
  return () => stage.dispose();
};

export default mount;
