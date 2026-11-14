// The docs' Poisson-disk sampler and Perlin noise components, typed for TypeScript
// @ts-expect-error the docs components are untyped JavaScript
import { octave as octaveJs, perlin2 as perlin2Js } from '../../docs/repo/docs/components/perlin.js';
// @ts-expect-error the docs components are untyped JavaScript
import { poisson as poissonJs } from '../../docs/repo/docs/components/poisson.js';

type Noise = (x: number, y: number) => number;

export const perlin2: Noise = perlin2Js;
export const octave: (noise: Noise, octaves: number) => Noise = octaveJs;
export const poisson: (extent: [number, number, number, number], n: number) => Iterable<[number, number]> = poissonJs;
