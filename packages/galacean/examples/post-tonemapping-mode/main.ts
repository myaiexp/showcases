// TonemappingEffect.mode: Neutral and ACES against no tonemapping
import { TonemappingEffect, TonemappingMode, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const MODES = ['Off', 'Neutral', 'ACES'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'TonemappingMode.Neutral and TonemappingMode.ACES on an HDR camera.' });
  const say = caption(stage);
  const tone = root.createChild('post').addComponent(PostProcess).addEffect(TonemappingEffect);
  const set = (mode: (typeof MODES)[number]): void => {
    tone.enabled = mode !== 'Off';
    if (mode !== 'Off') tone.mode.value = TonemappingMode[mode];
    say(mode === 'Off' ? 'no tonemapping' : `TonemappingMode.${mode}`);
  };
  if (stage.preview) steps(root, 2.2, 3, (i) => set(MODES[i]!));
  else {
    set('Off');
    select(stage.bar, 'mode', MODES, set);
  }
  return stage.dispose;
};

export default mount;
