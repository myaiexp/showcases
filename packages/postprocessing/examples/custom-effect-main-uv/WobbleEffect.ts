// A custom effect with only a UV function: it bends where the input buffer is sampled
import { Uniform } from 'three';
import { Effect } from 'postprocessing';

// With no colour function, the pass samples the input at the changed uv and applies no blend.
// `time` is one of the uniforms every effect shader gets; the EffectPass advances it.
const fragmentShader = /* glsl */ `
uniform float amplitude;
uniform float frequency;

void mainUv(inout vec2 uv) {
  uv.x += sin(uv.y * frequency + time * 2.0) * amplitude;
  uv.y += cos(uv.x * frequency * 0.8 + time * 1.3) * amplitude * 0.6;
}
`;

export class WobbleEffect extends Effect {
  constructor(amplitude = 0.01, frequency = 18) {
    super('WobbleEffect', fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ['amplitude', new Uniform(amplitude)],
        ['frequency', new Uniform(frequency)],
      ]),
    });
  }

  get amplitude(): number {
    return this.uniforms.get('amplitude')!.value as number;
  }
  set amplitude(v: number) {
    this.uniforms.get('amplitude')!.value = v;
  }
  get frequency(): number {
    return this.uniforms.get('frequency')!.value as number;
  }
  set frequency(v: number) {
    this.uniforms.get('frequency')!.value = v;
  }
}
