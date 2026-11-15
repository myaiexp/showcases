// Two custom effects that reuse the same uniform and function names, merged into one pass
import { Uniform } from 'three';
import { Effect } from 'postprocessing';

// Both shaders declare `uniform float strength` and `vec3 shade(...)`. Merged naively that
// would not compile; the EffectPass renames each effect's own names with an e0/e1 prefix.
const warm = /* glsl */ `
uniform float strength;

vec3 shade(const in vec3 c) {
  return c * vec3(1.25, 1.0, 0.75);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  outputColor = vec4(mix(inputColor.rgb, shade(inputColor.rgb), strength), inputColor.a);
}
`;

const contrast = /* glsl */ `
uniform float strength;

vec3 shade(const in vec3 c) {
  return c * c * (3.0 - 2.0 * c);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 c = clamp(inputColor.rgb, 0.0, 1.0);
  outputColor = vec4(mix(inputColor.rgb, shade(c), strength), inputColor.a);
}
`;

export class WarmEffect extends Effect {
  constructor(strength = 1) {
    super('WarmEffect', warm, { uniforms: new Map<string, Uniform>([['strength', new Uniform(strength)]]) });
  }
}

export class ContrastEffect extends Effect {
  constructor(strength = 1) {
    super('ContrastEffect', contrast, { uniforms: new Map<string, Uniform>([['strength', new Uniform(strength)]]) });
  }
}

/** Sets the `strength` uniform of either effect. */
export const setStrength = (effect: Effect, value: number): void => {
  effect.uniforms.get('strength')!.value = value;
};
