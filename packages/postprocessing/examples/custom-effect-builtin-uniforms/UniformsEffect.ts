// A custom effect that draws with the built-in uniforms: aspect, time, texelSize and resolution
import { Uniform } from 'three';
import { Effect } from 'postprocessing';

// Declared by the pass's shader template, so an effect just uses them (6.39):
//   vec2 resolution, vec2 texelSize, float aspect, float time, float cameraNear, float cameraFar.
// The manual's `vec4 resolution` and `vec3 cameraParams` are the v7 layout.
const fragmentShader = /* glsl */ `
uniform float mode;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 colour = inputColor.rgb * 0.45;
  vec3 ink = vec3(1.0, 0.8, 0.2);
  float k = 0.0;
  if (mode < 0.5) {
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    k = 1.0 - smoothstep(0.30, 0.31, length(p));
  } else if (mode < 1.5) {
    k = step(0.5, fract((uv.x + uv.y) * 8.0 - time * 0.5));
  } else if (mode < 2.5) {
    vec2 cell = mod(uv / texelSize, 32.0);
    k = max(step(cell.x, 1.0), step(cell.y, 1.0));
  } else {
    vec2 square = floor(uv * resolution / 64.0);
    k = mod(square.x + square.y, 2.0);
  }
  outputColor = vec4(mix(colour, ink, k * 0.55), inputColor.a);
}
`;

export const modes = [
  'aspect: a circle that stays round',
  'time: moving diagonal stripes',
  'texelSize: a line every 32 pixels',
  'resolution: 64 pixel squares',
] as const;

export class UniformsEffect extends Effect {
  constructor() {
    super('UniformsEffect', fragmentShader, { uniforms: new Map<string, Uniform>([['mode', new Uniform(0)]]) });
  }

  set mode(index: number) {
    this.uniforms.get('mode')!.value = index;
  }
}
