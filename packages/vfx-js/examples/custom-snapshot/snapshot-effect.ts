// Freezes a frame with ctx.blit into a target, drops it with ctx.clear
import type { Effect, EffectContext, EffectRenderTarget } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uv;
in vec2 uvSrc;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D shot;
uniform float hasShot;
uniform float split;

void main() {
    vec4 live = texture(src, uvSrc);
    vec4 frozen = texture(shot, uv);
    // The frozen frame on the left of the divider, the live video on the right.
    float left = step(uv.x, split) * hasShot;
    float line = (1.0 - smoothstep(0.0, 0.004, abs(uv.x - split))) * hasShot;
    outColor = vec4(mix(mix(live.rgb, frozen.rgb, left), vec3(1.0), line), 1.0);
}
`;

export class SnapshotEffect implements Effect {
  has = false;
  #shot: EffectRenderTarget | null = null;
  #wantSnap = false;
  #wantClear = false;

  init(ctx: EffectContext) {
    this.#shot = ctx.createRenderTarget();
  }

  /** Copy the next frame into the buffer. */
  snap() {
    this.#wantSnap = true;
    this.#wantClear = false;
  }

  /** Empty the buffer. */
  clear() {
    this.#wantClear = true;
    this.#wantSnap = false;
  }

  render(ctx: EffectContext) {
    if (!this.#shot) return;
    if (this.#wantSnap) {
      // Copies through uvSrc, so it lands in the buffer like the framework's own passthrough.
      ctx.blit(ctx.src, this.#shot);
      this.has = true;
      this.#wantSnap = false;
    }
    if (this.#wantClear) {
      ctx.clear(this.#shot);
      this.has = false;
      this.#wantClear = false;
    }
    ctx.draw({
      frag,
      uniforms: { src: ctx.src, shot: this.#shot, hasShot: this.has ? 1 : 0, split: 0.5 },
      target: ctx.target,
    });
  }

  dispose() {
    this.#shot = null;
  }
}
