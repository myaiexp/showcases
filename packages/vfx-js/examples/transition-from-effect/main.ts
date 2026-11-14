// VFX-JS example: a Transition that extends PixelateEffect from @vfx-js/effects
import type { EffectTexture, Transition, TransitionEffectContext } from '@vfx-js/core';
import { PixelateEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

class PixelateTransition extends PixelateEffect implements Transition {
  name = 'pixelate';
  peak = 40;

  update(ctx: TransitionEffectContext): void {
    // Cell size 1 px at the ends, `peak` px halfway. ctx.progress.t is the eased progress.
    this.params.size = 1 + this.peak * Math.sin(Math.PI * ctx.progress.t);
  }
  override render(ctx: TransitionEffectContext): void {
    if (ctx.holding) {
      ctx.blit(ctx.src);
      return;
    }
    // The effect pixelates whatever it is given as src: old content, then new content.
    // A render target reads as a texture.
    const input = ctx.progress.t < 0.5 ? (ctx.from as unknown as EffectTexture) : ctx.src;
    super.render({ ...ctx, src: input });
  }
}

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new PixelateTransition({ size: 1 });
  const t = vfx.addTransition(box, { transition: fx, duration: 1.4 });
  drive(kit, t, { label: () => `PixelateEffect as a transition, peak cell ${fx.peak}px` });
  if (stage.bar) {
    slider(stage.bar, 'peak cell size', 5, 120, 5, fx.peak, (v) => {
      fx.peak = v;
      stage.say(`PixelateEffect as a transition, peak cell ${v}px`);
    }, (v) => `${v}px`);
  }
  return () => stage.dispose();
};

export default mount;
