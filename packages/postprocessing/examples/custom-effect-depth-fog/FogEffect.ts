// A DEPTH effect: mainImage gets the pixel's depth as a third parameter and turns it into fog
import { Color, Uniform } from 'three';
import { Effect, EffectAttribute } from 'postprocessing';

// `depth` is the raw depth-buffer value. getViewZ() (from the pass's shader template) turns it
// into a negative view-space z, using cameraNear/cameraFar and the camera type.
const fragmentShader = /* glsl */ `
uniform vec3 fogColor;
uniform float density;

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {
  float distanceToCamera = -getViewZ(depth);
  float fog = 1.0 - exp(-distanceToCamera * density);
  outputColor = vec4(mix(inputColor.rgb, fogColor, fog), inputColor.a);
}
`;

export class FogEffect extends Effect {
  constructor(color = new Color(0x9db4d0), density = 0.06) {
    super('FogEffect', fragmentShader, {
      // DEPTH makes the EffectPass ask the composer for a depth texture.
      attributes: EffectAttribute.DEPTH,
      uniforms: new Map<string, Uniform>([
        ['fogColor', new Uniform(color)],
        ['density', new Uniform(density)],
      ]),
    });
  }

  get density(): number {
    return this.uniforms.get('density')!.value as number;
  }
  set density(v: number) {
    this.uniforms.get('density')!.value = v;
  }
}
