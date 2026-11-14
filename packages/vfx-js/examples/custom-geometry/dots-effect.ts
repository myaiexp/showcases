// An effect with its own geometry and vertex shader: a grid of points
import type { Effect, EffectContext, EffectGeometry } from '@vfx-js/core';

const vert = `#version 300 es
precision highp float;
in vec2 position;
uniform sampler2D src;
uniform float pointSize;
out vec4 vColor;

void main() {
    // position is in NDC (-1..1); the same spot in the input is at position * 0.5 + 0.5.
    vColor = textureLod(src, position * 0.5 + 0.5, 0.0);
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = pointSize;
}
`;

const frag = `#version 300 es
precision highp float;
in vec4 vColor;
out vec4 outColor;

void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = (1.0 - smoothstep(0.7, 1.0, d)) * vColor.a;
    outColor = vec4(vColor.rgb * a, a);
}
`;

export type DotsParams = {
  /** Cells across the element. */
  columns: number;
};

export class DotsEffect implements Effect {
  params: DotsParams;
  #geometry: EffectGeometry | null = null;
  #built = 0;

  constructor(params: Partial<DotsParams> = {}) {
    this.params = { columns: 24, ...params };
  }

  render(ctx: EffectContext) {
    const [w, h] = ctx.dims.elementPixel;
    const cols = Math.max(2, Math.round(this.params.columns));
    const rows = Math.max(2, Math.round((cols * h) / w));
    if (!this.#geometry || this.#built !== cols) {
      // Free the old buffers before replacing the geometry, as the types ask.
      if (this.#geometry) ctx.releaseGeometry(this.#geometry);
      const pos = new Float32Array(cols * rows * 2);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          pos[(j * cols + i) * 2] = ((i + 0.5) / cols) * 2 - 1;
          pos[(j * cols + i) * 2 + 1] = ((j + 0.5) / rows) * 2 - 1;
        }
      }
      this.#geometry = { mode: 'points', attributes: { position: { data: pos, itemSize: 2 } } };
      this.#built = cols;
    }
    ctx.clear(ctx.target);
    ctx.draw({
      frag,
      vert,
      geometry: this.#geometry,
      uniforms: { src: ctx.src, pointSize: (w / cols) * 0.95 },
      target: ctx.target,
    });
  }

  dispose() {
    this.#geometry = null;
  }
}
