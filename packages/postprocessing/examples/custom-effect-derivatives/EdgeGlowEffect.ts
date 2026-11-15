// A custom effect that asks for the DERIVATIVES extension and edge-detects with fwidth
import { Color, Uniform } from 'three';
import { Effect, WebGLExtension } from 'postprocessing';

// fwidth() measures how fast the luminance changes between neighbouring pixels. No texture
// reads, so this is not a convolution effect.
const fragmentShader = /* glsl */ `
uniform vec3 glow;
uniform float gain;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float luma = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
  float edge = clamp(fwidth(luma) * gain, 0.0, 1.0);
  outputColor = vec4(mix(inputColor.rgb * 0.35, glow, edge), inputColor.a);
}
`;

export class EdgeGlowEffect extends Effect {
  constructor(gain = 12) {
    super('EdgeGlowEffect', fragmentShader, {
      // WebGL 1 needed this extension for dFdx/dFdy/fwidth; in WebGL 2 they are core.
      extensions: new Set([WebGLExtension.DERIVATIVES]),
      uniforms: new Map<string, Uniform>([
        ['glow', new Uniform(new Color(0x36e0ff))],
        ['gain', new Uniform(gain)],
      ]),
    });
  }

  set gain(v: number) {
    this.uniforms.get('gain')!.value = v;
  }
}
