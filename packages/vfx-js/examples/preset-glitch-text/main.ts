// VFX-JS example: the "glitch" shader preset
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = headline('Glitch');
  stage.root.append(subject);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A preset name in place of GLSL.
  await vfx.add(subject, { shader: 'glitch', overflow: 30 });
  stage.say('shader: "glitch", overflow: 30');
  return () => stage.dispose();
};

export default mount;
