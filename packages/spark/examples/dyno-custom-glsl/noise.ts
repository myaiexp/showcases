// A custom Dyno in GLSL: noise functions in globals, the work in statements
import { dyno } from '@sparkjsdev/spark';

// `globals` strings are deduplicated by their whole text, so one unindent() block each.
const defineNoise = dyno.unindent(`
  float hash31(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float valueNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash31(i), hash31(i + vec3(1, 0, 0)), f.x),
          mix(hash31(i + vec3(0, 1, 0)), hash31(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash31(i + vec3(0, 0, 1)), hash31(i + vec3(1, 0, 1)), f.x),
          mix(hash31(i + vec3(0, 1, 1)), hash31(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
`);

type In = { gsplat: typeof dyno.Gsplat; freq: 'float'; amount: 'float'; time: 'float' };
type Out = { gsplat: typeof dyno.Gsplat };

/** Pushes each splat around by value noise of its position and tints it by the same noise. */
export class NoiseFuzz extends dyno.Dyno<In, Out> {
  constructor(inputs: { gsplat: dyno.DynoVal<typeof dyno.Gsplat>; freq: dyno.DynoVal<'float'>; amount: dyno.DynoVal<'float'>; time: dyno.DynoVal<'float'> }) {
    super({
      inTypes: { gsplat: dyno.Gsplat, freq: 'float', amount: 'float', time: 'float' },
      outTypes: { gsplat: dyno.Gsplat },
      inputs,
      globals: () => [dyno.defineGsplat, defineNoise],
      // Input and output names are replaced with the compiler's unique GLSL variable names.
      statements: ({ inputs: i, outputs: o }) =>
        dyno.unindentLines(`
          {
            vec3 p = ${i.gsplat}.center * ${i.freq};
            float t = ${i.time};
            vec3 push = vec3(
              valueNoise(p + vec3(t, 0.0, 0.0)),
              valueNoise(p + vec3(0.0, t, 7.3)),
              valueNoise(p + vec3(3.1, 0.0, t))) - 0.5;
            float n = valueNoise(p * 0.5 + vec3(0.0, 0.0, t * 0.5));
            ${o.gsplat} = ${i.gsplat};
            ${o.gsplat}.center += push * ${i.amount};
            ${o.gsplat}.rgba.rgb = mix(${i.gsplat}.rgba.rgb, vec3(n, 0.5 + 0.5 * n * n, 1.0 - n), 0.6);
          }
        `),
    });
  }
}
