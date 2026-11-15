// A custom effect that outputs its own picture and leaves the mixing to its blend function
import { Color, Uniform } from 'three';
import { BlendFunction, Effect } from 'postprocessing';

// The shader only writes the effect's colour. The EffectPass then blends it with the colour
// coming in, using this effect's blendMode (function and opacity).
const fragmentShader = /* glsl */ `
uniform vec3 stripeColor;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float stripe = step(0.5, fract((uv.x * aspect + uv.y) * 7.0));
  outputColor = vec4(mix(vec3(0.15), stripeColor, stripe), 1.0);
}
`;

export class StripesEffect extends Effect {
  constructor(blendFunction = BlendFunction.NORMAL) {
    super('StripesEffect', fragmentShader, {
      blendFunction,
      uniforms: new Map<string, Uniform>([['stripeColor', new Uniform(new Color(0xff8a3d))]]),
    });
  }
}
