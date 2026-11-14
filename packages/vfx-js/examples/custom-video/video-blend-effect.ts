// Blends a wrapped <video> into the element, a diagonal band at a time
import type { Effect, EffectContext, EffectTexture } from '@vfx-js/core';

const frag = `#version 300 es
precision highp float;
in vec2 uvSrc;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D clip;
uniform float amount;

void main() {
    vec4 base = texture(src, uvSrc);
    vec4 live = texture(clip, uvContent);
    // A soft diagonal edge sweeping across; amount 0 shows the picture, 1 the video.
    float edge = (uvContent.x + uvContent.y) * 0.5;
    float m = smoothstep(edge - 0.08, edge + 0.08, amount * 1.3 - 0.15);
    outColor = vec4(mix(base.rgb, live.rgb, m), base.a);
}
`;

export type VideoBlendParams = {
  /** 0 shows the element, 1 shows the video. */
  amount: number;
};

export class VideoBlendEffect implements Effect {
  params: VideoBlendParams;
  #video: HTMLVideoElement;
  #clip: EffectTexture | null = null;

  constructor(video: HTMLVideoElement, params: Partial<VideoBlendParams> = {}) {
    this.#video = video;
    this.params = { amount: 0.5, ...params };
  }

  init(ctx: EffectContext) {
    // A video uploads every frame by default; nothing else to say.
    this.#clip = ctx.wrapTexture(this.#video);
  }

  render(ctx: EffectContext) {
    if (!this.#clip) return;
    ctx.draw({
      frag,
      uniforms: { src: ctx.src, clip: this.#clip, amount: this.params.amount },
      target: ctx.target,
    });
  }

  dispose() {
    this.#clip?.dispose();
    this.#clip = null;
  }
}
