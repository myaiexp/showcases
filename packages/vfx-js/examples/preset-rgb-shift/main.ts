// VFX-JS example: the "rgbShift" shader preset
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = await picture('poster', ctx.preview ? 200 : 420);
  stage.root.append(subject);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A preset name in place of GLSL.
  await vfx.add(subject, { shader: 'rgbShift' });
  stage.say('shader: "rgbShift"');
  return () => stage.dispose();
};

export default mount;
