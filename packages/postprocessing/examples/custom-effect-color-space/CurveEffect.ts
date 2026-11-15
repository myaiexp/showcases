// A custom effect that asks the pass to hand it sRGB colours instead of linear ones
import { LinearSRGBColorSpace, SRGBColorSpace, Uniform } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = /* glsl */ `
uniform float amount;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 c = clamp(inputColor.rgb, 0.0, 1.0);
  vec3 curved = c * c * (3.0 - 2.0 * c);
  outputColor = vec4(mix(inputColor.rgb, curved, amount), inputColor.a);
}
`;

export class CurveEffect extends Effect {
  constructor(amount = 1) {
    super('CurveEffect', fragmentShader, { uniforms: new Map<string, Uniform>([['amount', new Uniform(amount)]]) });
  }

  /**
   * inputColorSpace is what the shader receives (default linear). The setter is protected and
   * recompiles the pass; the pass converts to sRGB before this effect and back to linear after.
   */
  setPerceptual(on: boolean): void {
    this.inputColorSpace = on ? SRGBColorSpace : LinearSRGBColorSpace;
  }
}
