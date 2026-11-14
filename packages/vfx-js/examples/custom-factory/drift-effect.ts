// A trail effect with its own buffer and speed: one instance per element
import type { Effect, EffectContext, EffectRenderTarget } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uv;
in vec2 uvSrc;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D prev;
uniform vec2 shift;

void main() {
    vec4 color = texture(src, uvSrc - shift);
    vec4 last = texture(prev, uv) * 0.93;
    outColor = max(color, last);
}
`;

const copyFrag = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 outColor;
uniform sampler2D buffer;

void main() {
    outColor = texture(buffer, uv);
}
`;

export type DriftParams = {
  /** Radians per second of the circle the ghost travels. */
  speed: number;
};

export class DriftEffect implements Effect {
  params: DriftParams;
  #buffer: EffectRenderTarget | null = null;
  #phase = 0;

  constructor(params: Partial<DriftParams> = {}) {
    this.params = { speed: 2, ...params };
  }

  init(ctx: EffectContext) {
    this.#buffer = ctx.createRenderTarget({ persistent: true });
  }

  update(ctx: EffectContext) {
    this.#phase += ctx.deltaTime * this.params.speed;
  }

  render(ctx: EffectContext) {
    if (!this.#buffer) return;
    ctx.draw({
      frag,
      uniforms: {
        src: ctx.src,
        prev: this.#buffer,
        shift: [Math.cos(this.#phase) * 0.06, Math.sin(this.#phase) * 0.12],
      },
      target: this.#buffer,
    });
    ctx.draw({ frag: copyFrag, uniforms: { buffer: this.#buffer }, target: ctx.target });
  }

  dispose() {
    this.#buffer = null;
  }
}
