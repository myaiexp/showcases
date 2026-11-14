// Draws a backdrop, then an alpha layer with the chosen blend mode
import type { Effect, EffectContext } from '@vfx-js/core';

type BlendMode = 'normal' | 'premultiplied' | 'additive' | 'none';

const backdropFrag = `#version 300 es
precision highp float;
in vec2 uvContent;
out vec4 outColor;

void main() {
    // Opaque stripes, so the blend has something to blend with.
    float s = step(0.5, fract(uvContent.x * 6.0));
    outColor = vec4(mix(vec3(0.15, 0.35, 0.8), vec3(0.9, 0.35, 0.2), s), 1.0);
}
`;

const layerFrag = `#version 300 es
precision highp float;
in vec2 uvSrc;
out vec4 outColor;
uniform sampler2D src;

void main() {
    // Straight colour with alpha 0.5: the picture's rgb is not multiplied by the alpha.
    outColor = vec4(texture(src, uvSrc).rgb, 0.5);
}
`;

export class BlendEffect implements Effect {
  mode: BlendMode;

  constructor(mode: BlendMode) {
    this.mode = mode;
  }

  render(ctx: EffectContext) {
    ctx.draw({ frag: backdropFrag, blend: 'none', target: ctx.target });
    ctx.draw({ frag: layerFrag, uniforms: { src: ctx.src }, blend: this.mode, target: ctx.target });
  }
}
