// A custom effect: multiplies the colour by a vec3 uniform (the manual's TL;DR, in v6 form)
import { Uniform, Vector3 } from 'three';
import { Effect } from 'postprocessing';

// v6 signature: the colour comes in as `inputColor` and leaves through the `out` parameter.
// (The manual's `vec4 mainImage(in vec4, in vec2, in GData)` is the v7 form.)
const fragmentShader = /* glsl */ `
uniform vec3 weights;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  outputColor = vec4(inputColor.rgb * weights, inputColor.a);
}
`;

export class WeightsEffect extends Effect {
  constructor(weights = new Vector3(1, 1, 1)) {
    super('WeightsEffect', fragmentShader, {
      uniforms: new Map<string, Uniform>([['weights', new Uniform(weights)]]),
    });
  }

  get weights(): Vector3 {
    return this.uniforms.get('weights')!.value as Vector3;
  }
}
