// A custom effect that samples a NoiseTexture to dissolve the picture away
import { Color, RepeatWrapping, Uniform } from 'three';
import { Effect, NoiseTexture } from 'postprocessing';

// One noise texel covers `cell` pixels of the frame; the texture tiles with RepeatWrapping.
const fragmentShader = /* glsl */ `
uniform sampler2D noise;
uniform float progress;
uniform float cell;
uniform vec3 ember;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float n = texture2D(noise, uv * resolution / (cell * 128.0)).r;
  float keep = step(progress, n);
  float band = keep * (1.0 - smoothstep(progress, progress + 0.07, n)) * step(0.001, progress);
  outputColor = vec4(inputColor.rgb * keep + ember * band * 2.0, inputColor.a);
}
`;

export class DissolveEffect extends Effect {
  readonly noise = new NoiseTexture(128, 128);

  constructor() {
    super('DissolveEffect', fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ['noise', new Uniform(null)],
        ['progress', new Uniform(0)],
        ['cell', new Uniform(4)],
        ['ember', new Uniform(new Color(0xff7a2a))],
      ]),
    });
    // A DataTexture clamps by default: repeat it so it tiles over the frame.
    this.noise.wrapS = this.noise.wrapT = RepeatWrapping;
    this.noise.needsUpdate = true;
    this.uniforms.get('noise')!.value = this.noise;
  }

  set progress(v: number) {
    this.uniforms.get('progress')!.value = v;
  }
  set cell(v: number) {
    this.uniforms.get('cell')!.value = v;
  }
}
