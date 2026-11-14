// A spotlight that draws over the whole canvas via dims.canvasRect
import type { Effect, EffectContext, EffectDims } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uv;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform vec4 srcRectUv;
uniform vec2 pointer;
uniform vec2 resolution;
uniform float radius;

void main() {
    // The element, wherever it falls inside the canvas-sized output.
    vec4 base = vec4(0.0);
    if (uvContent.x >= 0.0 && uvContent.x <= 1.0 && uvContent.y >= 0.0 && uvContent.y <= 1.0) {
        base = texture(src, srcRectUv.xy + uvContent * srcRectUv.zw);
    }
    // A round glow around the pointer, measured in physical px.
    float d = length((uv - pointer) * resolution);
    float glow = exp(-pow(d / radius, 2.0));
    vec3 light = vec3(1.0, 0.82, 0.45) * glow;
    outColor = vec4(base.rgb + light, clamp(base.a + glow * 0.9, 0.0, 1.0));
}
`;

export type SpotlightParams = {
  /** Glow radius in CSS px. */
  radius: number;
};

export class SpotlightEffect implements Effect {
  params: SpotlightParams;

  constructor(params: Partial<SpotlightParams> = {}) {
    this.params = { radius: 90, ...params };
  }

  render(ctx: EffectContext) {
    const [rw, rh] = ctx.resolution;
    ctx.draw({
      frag,
      uniforms: {
        src: ctx.src,
        // mouseViewport is canvas px, bottom-left origin; uv is 0..1 over the same canvas.
        pointer: [ctx.mouseViewport[0] / rw, ctx.mouseViewport[1] / rh],
        resolution: [rw, rh],
        radius: this.params.radius * ctx.pixelRatio,
      },
      target: ctx.target,
    });
  }

  // The output covers the whole canvas, not just the element.
  outputRect(dims: EffectDims) {
    return dims.canvasRect;
  }
}
