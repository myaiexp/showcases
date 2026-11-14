// a two-pass blur-fade written as a Transition (not a ShaderTransition)
import type { EffectContext, EffectRenderTarget, Transition, TransitionEffectContext } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

// Blurs along `dir`, mixing in the old content by `mixT`.
const FRAG_BLUR = `#version 300 es
precision highp float;
in vec2 uvSrc;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D from;
uniform vec2 dir;
uniform float mixT;
void main() {
    vec4 c = vec4(0.0);
    for (int i = -4; i <= 4; i++) {
        vec2 d = dir * float(i);
        c += mix(texture(from, uvContent + d), texture(src, uvSrc + d), mixT);
    }
    outColor = c / 9.0;
}
`;

class BlurFade implements Transition {
  name = 'blur_fade';
  radius = 4;
  #blurredX: EffectRenderTarget | null = null;

  init(ctx: EffectContext): void {
    this.#blurredX = ctx.createRenderTarget();
  }
  dispose(): void {
    this.#blurredX?.dispose();
    this.#blurredX = null;
  }

  render(ctx: TransitionEffectContext): void {
    // While the old content is held, show the input unchanged.
    if (ctx.holding || !this.#blurredX) {
      ctx.blit(ctx.src);
      return;
    }
    const [w, h] = ctx.dims.elementPixel;
    const { t } = ctx.progress;
    const r = this.radius * Math.sin(Math.PI * t);
    // Pass 1: horizontal blur, crossfading from -> src, into our own target.
    ctx.draw({
      frag: FRAG_BLUR,
      uniforms: { src: ctx.src, from: ctx.from, dir: [r / w, 0], mixT: t },
      target: this.#blurredX,
    });
    // Pass 2: vertical blur of that target into the output.
    ctx.draw({
      frag: FRAG_BLUR,
      uniforms: { src: this.#blurredX, from: this.#blurredX, dir: [0, r / h], mixT: 1 },
      target: ctx.target,
    });
  }
}

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new BlurFade();
  const t = vfx.addTransition(box, { transition: fx, duration: 1.2 });
  drive(kit, t, { label: () => `BlurFade, 2 passes, radius ${fx.radius}` });
  if (stage.bar) {
    slider(stage.bar, 'radius', 0, 12, 0.5, fx.radius, (v) => {
      fx.radius = v;
      stage.say(`BlurFade, 2 passes, radius ${v}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
