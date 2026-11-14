// VFX-JS example: the "blink" shader preset
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = panel('Blink', 'Plain HTML, captured once as a texture and drawn through the preset.');
  stage.root.append(subject);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A preset name in place of GLSL.
  await vfx.add(subject, { shader: 'blink' });
  stage.say('shader: "blink"');
  return () => stage.dispose();
};

export default mount;
