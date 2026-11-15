// A CONVOLUTION effect: it reads the neighbours of each pixel from the input buffer
import { Uniform } from 'three';
import { Effect, EffectAttribute } from 'postprocessing';

// `inputBuffer` is the compound shader's input texture. Sampling it away from `uv` makes this
// a convolution effect, which has to say so with EffectAttribute.CONVOLUTION.
const fragmentShader = /* glsl */ `
uniform float amount;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 around = texture2D(inputBuffer, uv + vec2(texelSize.x, 0.0)).rgb
              + texture2D(inputBuffer, uv - vec2(texelSize.x, 0.0)).rgb
              + texture2D(inputBuffer, uv + vec2(0.0, texelSize.y)).rgb
              + texture2D(inputBuffer, uv - vec2(0.0, texelSize.y)).rgb;
  vec3 sharp = inputColor.rgb * 5.0 - around;
  outputColor = vec4(max(mix(inputColor.rgb, sharp, amount), 0.0), inputColor.a);
}
`;

export class SharpenEffect extends Effect {
  constructor(amount = 1) {
    super('SharpenEffect', fragmentShader, {
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map<string, Uniform>([['amount', new Uniform(amount)]]),
    });
  }

  get amount(): number {
    return this.uniforms.get('amount')!.value as number;
  }
  set amount(v: number) {
    this.uniforms.get('amount')!.value = v;
  }
}
