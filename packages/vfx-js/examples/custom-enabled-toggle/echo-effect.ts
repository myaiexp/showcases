// An echo trail that counts its hooks, to compare enabled and updateEffects
import type { Effect, EffectContext, EffectRenderTarget } from '@vfx-js/core';

const echoFrag = `#version 300 es
precision highp float;
in vec2 uv;
in vec2 uvSrc;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D prev;
uniform vec2 shift;

void main() {
    vec4 color = texture(src, uvSrc - shift);
    vec4 last = texture(prev, uv) * vec4(0.93, 0.86, 0.97, 0.95);
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

export class EchoEffect implements Effect {
  /** Checked every frame: false skips render() and passes the input through. */
  enabled = true;
  updates = 0;
  renders = 0;
  inits = 0;
  #phase = 0;
  #buffer: EffectRenderTarget | null = null;

  init(ctx: EffectContext) {
    this.inits++;
    this.#buffer = ctx.createRenderTarget({ persistent: true });
  }

  update(ctx: EffectContext) {
    // Runs every frame, enabled or not, while the effect is in the chain.
    this.updates++;
    this.#phase += ctx.deltaTime * 2.5;
  }

  render(ctx: EffectContext) {
    if (!this.#buffer) return;
    this.renders++;
    ctx.draw({
      frag: echoFrag,
      uniforms: {
        src: ctx.src,
        prev: this.#buffer,
        shift: [Math.cos(this.#phase) * 0.09, Math.sin(this.#phase) * 0.09],
      },
      target: this.#buffer,
    });
    ctx.draw({ frag: copyFrag, uniforms: { buffer: this.#buffer }, target: ctx.target });
  }

  dispose() {
    this.#buffer = null;
  }
}
