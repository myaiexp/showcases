// A custom effect that overrides update() to advance its own clock and drive a uniform
import { Uniform, type WebGLRenderer, type WebGLRenderTarget } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = /* glsl */ `
uniform float beat;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 p = uv - 0.5;
  float edge = smoothstep(0.15, 0.75, length(p));
  vec3 colour = inputColor.rgb * (1.0 + beat * 0.35);
  colour = mix(colour, vec3(0.8, 0.05, 0.1), edge * (0.25 + beat * 0.6));
  outputColor = vec4(colour, inputColor.a);
}
`;

export class HeartbeatEffect extends Effect {
  /** Beats per minute. */
  bpm = 70;
  /** Beats elapsed, advanced by update(). */
  phase = 0;

  constructor() {
    super('HeartbeatEffect', fragmentShader, { uniforms: new Map<string, Uniform>([['beat', new Uniform(0)]]) });
  }

  // The EffectPass calls update() before every render, even with BlendFunction.SKIP.
  // The renderer and the previous pass's buffer are there for effects that render something.
  override update(_renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget, deltaTime = 0): void {
    this.phase += (deltaTime * this.bpm) / 60;
    const t = this.phase % 1;
    // A double thump: a sharp pulse, then a smaller one a third of a beat later.
    const pulse = Math.exp(-t * 14) + 0.6 * Math.exp(-Math.abs(t - 0.3) * 20);
    this.uniforms.get('beat')!.value = pulse;
  }
}
