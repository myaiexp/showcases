// VFX-JS example: the "halftone" shader preset
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { liveVideo } from '../../shared/video.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = await liveVideo(stage, ctx.preview ? 200 : 420);
  stage.root.append(subject);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A preset name in place of GLSL.
  await vfx.add(subject, { shader: 'halftone' });
  stage.say('shader: "halftone" on a <video>');
  return () => stage.dispose();
};

export default mount;
