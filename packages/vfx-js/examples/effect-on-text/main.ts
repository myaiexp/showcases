// VFX-JS: SinewaveEffect on a heading, re-captured when the text changes
import { VFX } from '@vfx-js/core';
import { SinewaveEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { createStage } from '../../shared/stage.ts';
import { headline } from '../../shared/subjects.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Waves', '#ffd166');
  stage.root.append(title);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Text is a snapshot: VFX-JS draws the heading to an image once, hides it
  // and draws that image through the effect. The heading stays real DOM.
  const wave = new SinewaveEffect({ amount: ctx.preview ? 8 : 14, frequency: 5, blur: 0 });
  await vfx.add(title, { effect: wave });

  if (stage.bar) {
    paramSliders(stage.bar, wave.params, [
      ['amount', 0, 40, 1],
      ['frequency', 1, 20, 0.5],
      ['speed', 0, 4, 0.05],
    ]);
    textInput(
      stage.bar,
      'text',
      'Waves',
      (v) => {
        title.textContent = v;
        void vfx.update(title);
      },
      10,
    );
    stage.say('The heading is ordinary text in the page; the wave is drawn over it. Edit the text and it is captured again.');
  } else {
    stage.say('text captured and waved');
  }
  return () => stage.dispose();
};

export default mount;
