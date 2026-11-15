// Deprecated effects patched to compile on three 0.187 (two dropped GLSL helpers)
//
// RealisticBokehEffect calls linearToRelativeLuminance() and GammaCorrectionEffect calls
// LinearToGamma(); three 0.187's shader chunks no longer define either, so both effects fail to
// compile as shipped in postprocessing 6.39.6 (both are @deprecated in the JSDoc). Each subclass
// puts the old helper back in front of the effect's own shader through Effect.setFragmentShader,
// the documented hook for replacing an effect's shader. Nothing else about the effects changes.
import { GammaCorrectionEffect, RealisticBokehEffect } from 'postprocessing';

const LUMINANCE = /* glsl */ `
float linearToRelativeLuminance(const in vec3 color) {
	return dot(color, vec3(0.2126, 0.7152, 0.0722));
}
`;

const GAMMA = /* glsl */ `
vec4 LinearToGamma(const in vec4 value, const in float gammaFactor) {
	return vec4(pow(value.rgb, vec3(1.0 / gammaFactor)), value.a);
}
`;

export class PatchedRealisticBokehEffect extends RealisticBokehEffect {
  constructor(options?: ConstructorParameters<typeof RealisticBokehEffect>[0]) {
    super(options);
    this.setFragmentShader(LUMINANCE + (this as unknown as { fragmentShader: string }).fragmentShader);
  }
}

export class PatchedGammaCorrectionEffect extends GammaCorrectionEffect {
  constructor(options?: ConstructorParameters<typeof GammaCorrectionEffect>[0]) {
    super(options);
    this.setFragmentShader(GAMMA + (this as unknown as { fragmentShader: string }).fragmentShader);
  }
}
