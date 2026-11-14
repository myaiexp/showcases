// VFX.init() returns null without WebGL, so the page stays plain HTML
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Hello');
  stage.root.append(title);

  // `new VFX()` throws when WebGL is not available; VFX.init() returns null instead.
  const real = VFX.init({ ...stage.vfxOpts });
  if (real) stage.own(real);

  // This browser has WebGL, so the toggle stands in for a browser without it.
  let pretendNoWebGL = false;
  const apply = async (): Promise<void> => {
    const vfx = pretendNoWebGL ? null : real;
    if (vfx) {
      await vfx.add(title, { shader: 'glitch', overflow: 30 });
      stage.say('VFX.init() gave a VFX: the headline is drawn by WebGL', 'ok');
    } else {
      // Nothing to add: the element stays ordinary HTML.
      real?.remove(title);
      stage.say('VFX.init() gave null: no effect, the headline stays plain HTML', 'warn');
    }
  };

  if (stage.bar) {
    checkbox(stage.bar, 'pretend init() returned null', false, (v) => {
      pretendNoWebGL = v;
      void apply();
    });
  } else {
    stage.every(3000, () => {
      pretendNoWebGL = !pretendNoWebGL;
      void apply();
    });
  }
  await apply();
  return () => stage.dispose();
};

export default mount;
