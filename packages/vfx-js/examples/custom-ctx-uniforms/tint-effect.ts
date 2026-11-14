// An effect reading vfx.add's uniforms option from ctx.uniforms
import type { Effect, EffectContext, EffectUniformValue } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uvSrc;
out vec4 outColor;
uniform sampler2D src;
uniform vec3 tint;
uniform float strength;

void main() {
    vec4 c = texture(src, uvSrc);
    vec3 grey = vec3(dot(c.rgb, vec3(0.299, 0.587, 0.114)));
    outColor = vec4(mix(c.rgb, grey * tint, strength), c.a);
}
`;

const asNumber = (v: EffectUniformValue | undefined, fallback: number): number => (typeof v === 'number' ? v : fallback);

export class TintEffect implements Effect {
  /** What render() last read from ctx.uniforms, for display. */
  seen: { tint: number[]; strength: number } = { tint: [1, 1, 1], strength: 0 };

  render(ctx: EffectContext) {
    // The values come from vfx.add(el, { uniforms }): functions are called every frame first.
    const tint = ctx.uniforms['tint'];
    const strength = asNumber(ctx.uniforms['strength'], 1);
    const rgb = Array.isArray(tint) && tint.length === 3 ? tint : [1, 1, 1];
    this.seen = { tint: rgb, strength };
    ctx.draw({
      frag,
      uniforms: { src: ctx.src, tint: rgb as [number, number, number], strength },
      target: ctx.target,
    });
  }
}
