// a chain of two custom effects, where the order decides who sees the padding
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';
import { TrailEffect } from './trail-effect.ts';
import { WaveEffect } from './wave-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Chain');
  title.style.fontSize = ctx.preview ? '48px' : '96px';
  title.style.margin = ctx.preview ? '0 30px' : '0 60px';
  stage.root.append(title);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const wave = new WaveEffect({ amount: 1.5 });
  const trail = new TrailEffect();
  await vfx.add(title, { effect: [wave, trail] });

  const order = async (trailFirst: boolean): Promise<void> => {
    await vfx.updateEffects(title, trailFirst ? [trail, wave] : [wave, trail]);
    stage.say(
      trailFirst
        ? '[trail, wave]: the wave reads the padded trail through srcRectUv, but its shader returns nothing outside the element, so the trail is cut off at the left and right edges (it still reaches 60px above and below).'
        : '[wave, trail]: the trail reads the wavy text and draws it 60px beyond the element.',
    );
  };

  if (stage.bar) {
    checkbox(stage.bar, 'trail first', false, (v) => void order(v));
    stage.say('[wave, trail]: the trail reads the wavy text and draws it 60px beyond the element.');
  } else {
    stage.cycle([false, true], 3500, (trailFirst) => void order(trailFirst));
  }
  return () => stage.dispose();
};

export default mount;
