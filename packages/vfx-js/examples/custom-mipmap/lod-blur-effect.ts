// A one-draw blur: read a coarser level of a mipmapped target
import type { Effect, EffectContext, EffectRenderTarget } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uvSrc;
out vec4 outColor;
uniform sampler2D mips;
uniform float lod;

void main() {
    outColor = textureLod(mips, uvSrc, lod);
}
`;

export type LodBlurParams = {
  /** Mip level to read: 0 is sharp, each step halves the resolution. */
  lod: number;
};

export class LodBlurEffect implements Effect {
  params: LodBlurParams;
  #mips: EffectRenderTarget | null = null;

  constructor(params: Partial<LodBlurParams> = {}) {
    this.params = { lod: 3, ...params };
  }

  init(ctx: EffectContext) {
    // mipmap: true builds a full chain and regenerates it after every draw into this target.
    this.#mips = ctx.createRenderTarget({ mipmap: true });
  }

  render(ctx: EffectContext) {
    if (!this.#mips) return;
    ctx.blit(ctx.src, this.#mips);
    ctx.draw({
      frag,
      uniforms: { mips: this.#mips, lod: this.params.lod },
      target: ctx.target,
    });
  }

  dispose() {
    this.#mips = null;
  }
}
