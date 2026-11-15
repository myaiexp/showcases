// A DEPTH effect that calls readDepth() at neighbouring coordinates to draw depth edges
import { Color, Uniform } from 'three';
import { Effect, EffectAttribute } from 'postprocessing';

// readDepth(uv) fetches the depth at any coordinate; texelSize is the size of one pixel in uv.
// Only the depth buffer is sampled here, not the input, so this is not a convolution effect.
const fragmentShader = /* glsl */ `
uniform vec3 lineColor;
uniform float sensitivity;

float distanceAt(const in vec2 coord) {
  return -getViewZ(readDepth(coord));
}

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {
  vec2 o = texelSize * 1.5;
  float centre = distanceAt(uv);
  float jump = abs(distanceAt(uv + vec2(o.x, 0.0)) - centre)
             + abs(distanceAt(uv - vec2(o.x, 0.0)) - centre)
             + abs(distanceAt(uv + vec2(0.0, o.y)) - centre)
             + abs(distanceAt(uv - vec2(0.0, o.y)) - centre);
  // A depth jump is relative to the distance: far surfaces change faster per pixel.
  float edge = smoothstep(0.02, 0.06, jump * sensitivity / max(centre, 1.0)) * step(depth, 0.9999);
  outputColor = vec4(mix(inputColor.rgb, lineColor, edge), inputColor.a);
}
`;

export class DepthEdgeEffect extends Effect {
  constructor(color = new Color(0xffd23d), sensitivity = 4) {
    super('DepthEdgeEffect', fragmentShader, {
      attributes: EffectAttribute.DEPTH,
      uniforms: new Map<string, Uniform>([
        ['lineColor', new Uniform(color)],
        ['sensitivity', new Uniform(sensitivity)],
      ]),
    });
  }

  get sensitivity(): number {
    return this.uniforms.get('sensitivity')!.value as number;
  }
  set sensitivity(v: number) {
    this.uniforms.get('sensitivity')!.value = v;
  }
}
