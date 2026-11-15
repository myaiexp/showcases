// noise, fbm, voronoi and rand follow the seed
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "noise(p)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          v: noise(uv * 8 + vec2(t * .5, 0));
          fill: ramp(v, #0b132b, #3a86ff, #ffbe0b, #fff);
        );
      ` },
    { label: "fbm(p)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          v: fbm(uv * 5 + vec2(0, t * .3));
          fill: ramp(v, #0b132b, #3a86ff, #ffbe0b, #fff);
        );
      ` },
    { label: "voronoi(p)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          v: voronoi(uv * 6 + t * .3);
          fill: ramp(v, #0b132b, #3a86ff, #ffbe0b, #fff);
        );
      ` },
    { label: "rand(p)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          v: rand(floor(uv * 24) + floor(t * 3));
          fill: ramp(v, #0b132b, #3a86ff, #ffbe0b, #fff);
        );
      ` },
  ],
  reroll: true,
  say: "Same functions, new seed, new pattern",
});
