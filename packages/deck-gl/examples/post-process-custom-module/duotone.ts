// A hand-written screen-space filter module for PostProcessEffect: duotone
import type { ShaderPass } from '@luma.gl/shadertools';

export interface DuotoneProps {
  /** RGB 0-1 for the darkest pixels. */
  shadowColor: [number, number, number];
  /** RGB 0-1 for the brightest pixels. */
  lightColor: [number, number, number];
  /** 0 keeps the original image, 1 is fully duotone. */
  amount: number;
}

/**
 * The docs point at @luma.gl/effects for ready-made modules and at their source for writing
 * your own. A filter pass provides `<name>_filterColor_ext(color, texSize, texCoord)`.
 */
export const duotone: ShaderPass = {
  name: 'duotone',
  fs: `\
layout(std140) uniform duotoneUniforms {
  vec3 shadowColor;
  vec3 lightColor;
  float amount;
} duotone;

vec4 duotone_filterColor_ext(vec4 color, vec2 texSize, vec2 texCoord) {
  float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  vec3 mapped = mix(duotone.shadowColor, duotone.lightColor, luma);
  return vec4(mix(color.rgb, mapped * color.a, duotone.amount), color.a);
}
`,
  uniformTypes: { shadowColor: 'vec3<f32>', lightColor: 'vec3<f32>', amount: 'f32' },
  defaultUniforms: { shadowColor: [0.05, 0.0, 0.25], lightColor: [1.0, 0.8, 0.3], amount: 1 },
  passes: [{ filter: true }],
};
