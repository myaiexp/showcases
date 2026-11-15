// A custom effect with a vertex shader: mainSupport fills a varying the fragment shader reads
import { Color, Uniform } from 'three';
import { Effect } from 'postprocessing';

// The pass calls mainSupport(vUv) once per vertex of its fullscreen triangle. A varying is
// declared in both shaders; the pass renames it per effect, so it cannot clash with another's.
// `time` is available in the vertex shader too.
const vertexShader = /* glsl */ `
uniform vec3 colorA;
uniform vec3 colorB;
varying vec3 vTint;

void mainSupport(const in vec2 uv) {
  vec2 p = uv * 2.0 - 1.0;
  float angle = time * 0.6;
  float along = dot(p, vec2(cos(angle), sin(angle))) * 0.35 + 0.5;
  vTint = mix(colorA, colorB, along);
}
`;

const fragmentShader = /* glsl */ `
varying vec3 vTint;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float grey = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
  outputColor = vec4(mix(inputColor.rgb, vTint * (grey + 0.15) * 1.6, 0.75), inputColor.a);
}
`;

export class GradientEffect extends Effect {
  constructor(colorA = new Color(0xff5a36), colorB = new Color(0x36c8ff)) {
    super('GradientEffect', fragmentShader, {
      vertexShader,
      uniforms: new Map<string, Uniform>([
        ['colorA', new Uniform(colorA)],
        ['colorB', new Uniform(colorB)],
      ]),
    });
  }

  get colorA(): Color {
    return this.uniforms.get('colorA')!.value as Color;
  }
  get colorB(): Color {
    return this.uniforms.get('colorB')!.value as Color;
  }
}
