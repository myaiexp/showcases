// text is captured once, so a changing counter needs vfx.update(el)
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const counter = headline('0');
  stage.root.append(counter);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(counter, { shader: 'rainbow' });

  // The card alternates: four ticks with update(), four without.
  let callUpdate = true;
  if (stage.bar) checkbox(stage.bar, 'call vfx.update(el) after each change', true, (v) => (callUpdate = v));

  let n = 0;
  stage.every(700, () => {
    n++;
    if (ctx.preview) callUpdate = Math.floor(n / 4) % 2 === 0;
    counter.textContent = String(n);
    // Text is drawn to a texture once. After its content changes, capture it again.
    if (callUpdate) void vfx.update(counter);
    stage.say(callUpdate ? `textContent = ${n}; vfx.update(el)` : `textContent = ${n}, no update: the texture keeps the old number`);
  });
  return () => stage.dispose();
};

export default mount;
