// A DEPTH effect that stripes the scene by view distance, for perspective or orthographic cameras
import { Uniform } from 'three';
import { Effect, EffectAttribute } from 'postprocessing';

// getViewZ() picks the right depth-to-distance formula: the EffectPass defines
// PERSPECTIVE_CAMERA when the camera it was given is a PerspectiveCamera, and copies the
// camera's near and far into cameraNear and cameraFar. Warm bands: perspective, cool: orthographic.
const fragmentShader = /* glsl */ `
uniform float spacing;

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {
  float distanceToCamera = -getViewZ(depth);
  float band = step(0.5, fract(distanceToCamera / spacing));
  #ifdef PERSPECTIVE_CAMERA
    vec3 ink = vec3(1.0, 0.55, 0.2);
  #else
    vec3 ink = vec3(0.2, 0.7, 1.0);
  #endif
  outputColor = vec4(mix(inputColor.rgb, ink, band * 0.45), inputColor.a);
}
`;

export class BandsEffect extends Effect {
  constructor(spacing = 3) {
    super('BandsEffect', fragmentShader, {
      attributes: EffectAttribute.DEPTH,
      uniforms: new Map<string, Uniform>([['spacing', new Uniform(spacing)]]),
    });
  }

  set spacing(v: number) {
    this.uniforms.get('spacing')!.value = v;
  }
}
