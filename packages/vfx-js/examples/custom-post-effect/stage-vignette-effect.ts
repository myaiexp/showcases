// A vignette for a post effect: darkens away from a centre given in canvas uv
import type { Effect, EffectContext } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform vec4 srcRectUv;
uniform vec2 center;
uniform vec2 size;
uniform float radius;
uniform float intensity;

void main() {
    vec4 c = texture(src, srcRectUv.xy + uvContent * srcRectUv.zw);
    // Distance from the centre in CSS px, past radius it darkens.
    float d = length((uvContent - center) * size);
    float v = smoothstep(radius, radius * 1.8, d);
    outColor = vec4(c.rgb * (1.0 - intensity * v), c.a);
}
`;

export type StageVignetteParams = {
  /** Where the darkening starts, in CSS px from the centre. */
  radius: number;
  intensity: number;
};

export class StageVignetteEffect implements Effect {
  params: StageVignetteParams;
  #center: () => [number, number];

  /** `center` returns the middle of the vignette in canvas uv (0..1, y up). */
  constructor(center: () => [number, number], params: Partial<StageVignetteParams> = {}) {
    this.#center = center;
    this.params = { radius: 150, intensity: 0.85, ...params };
  }

  render(ctx: EffectContext) {
    ctx.draw({
      frag,
      uniforms: {
        src: ctx.src,
        center: this.#center(),
        // In a post effect dims.element is the canvas size.
        size: [ctx.dims.element[0], ctx.dims.element[1]],
        radius: this.params.radius,
        intensity: this.params.intensity,
      },
      target: ctx.target,
    });
  }
}
