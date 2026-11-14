// EFFECT.md's separable blur: a horizontal pass, then a vertical one
import type { Effect, EffectContext, EffectRenderTarget } from '@vfx-js/core';

const FRAG_BLUR = `#version 300 es
precision highp float;
in vec2 uvSrc;
out vec4 outColor;
uniform sampler2D src;
uniform vec2 dir;

void main() {
    vec4 c = vec4(0.0);
    for (int i = -4; i <= 4; i++) {
        c += texture(src, uvSrc + dir * float(i));
    }
    outColor = c / 9.0;
}
`;

export type BlurParams = {
  /** Distance between the nine taps, in texels. The guide uses 1. */
  spread: number;
};

export class BlurEffect implements Effect {
  params: BlurParams;
  #tmp: EffectRenderTarget | null = null;

  constructor(params: Partial<BlurParams> = {}) {
    this.params = { spread: 1, ...params };
  }

  init(ctx: EffectContext) {
    this.#tmp = ctx.createRenderTarget();
  }

  render(ctx: EffectContext) {
    if (!this.#tmp) return;
    const [w, h] = ctx.dims.elementPixel;
    const s = this.params.spread;
    ctx.draw({
      frag: FRAG_BLUR,
      uniforms: { src: ctx.src, dir: [s / w, 0] },
      target: this.#tmp,
    });
    ctx.draw({
      frag: FRAG_BLUR,
      uniforms: { src: this.#tmp, dir: [0, s / h] },
      target: ctx.target,
    });
  }
}
