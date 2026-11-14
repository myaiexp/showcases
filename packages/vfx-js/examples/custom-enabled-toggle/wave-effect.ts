// A small wave effect to put in front of the echo in the chain
import type { Effect, EffectContext } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform vec4 srcRectUv;
uniform float time;
uniform float amount;

void main() {
    vec2 uv = uvContent;
    uv.y += sin(uv.x * 14.0 + time * 4.0) * 0.06 * amount;
    if (uv.y < 0.0 || uv.y > 1.0) {
        outColor = vec4(0);
        return;
    }
    outColor = texture(src, srcRectUv.xy + uv * srcRectUv.zw);
}
`;

export class WaveEffect implements Effect {
  params: { amount: number };

  constructor(params: Partial<{ amount: number }> = {}) {
    this.params = { amount: 1, ...params };
  }

  render(ctx: EffectContext) {
    ctx.draw({ frag, uniforms: { src: ctx.src, time: ctx.time, amount: this.params.amount }, target: ctx.target });
  }
}
