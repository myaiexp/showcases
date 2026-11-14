// An effect with an async init(): decode a picture, then wrap it
import type { Effect, EffectContext, EffectTexture } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uvSrc;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D poster;
uniform float time;

void main() {
    vec4 base = texture(src, uvSrc);
    vec4 other = texture(poster, uvContent);
    // A vertical line sweeps left and right; the poster is on its left.
    float x = 0.5 + 0.4 * sin(time * 1.5);
    float m = 1.0 - smoothstep(x - 0.01, x + 0.01, uvContent.x);
    float line = 1.0 - smoothstep(0.0, 0.006, abs(uvContent.x - x));
    outColor = vec4(mix(mix(base.rgb, other.rgb, m), vec3(1.0), line), base.a);
}
`;

export class PosterEffect implements Effect {
  #url: string;
  #delay: number;
  #texture: EffectTexture | null = null;
  /** True once init() has finished. */
  ready = false;

  constructor(url: string, delay = 0) {
    this.#url = url;
    this.#delay = delay;
  }

  async init(ctx: EffectContext) {
    // vfx.add() does not resolve, and nothing renders, until this promise does.
    const img = new Image();
    img.src = this.#url;
    await img.decode();
    if (this.#delay) await new Promise((r) => setTimeout(r, this.#delay));
    this.#texture = ctx.wrapTexture(img);
    this.ready = true;
  }

  render(ctx: EffectContext) {
    if (!this.#texture) return;
    ctx.draw({
      frag,
      uniforms: { src: ctx.src, poster: this.#texture, time: ctx.time },
      target: ctx.target,
    });
  }

  dispose() {
    this.#texture?.dispose();
    this.#texture = null;
    this.ready = false;
  }
}
