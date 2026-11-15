// rand(), rand(p), rand(p, k) and rand(p + 1)
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "rand()", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 20;
          fill: rand();
        );
      ` },
    { label: "rand(), rand(), rand()", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 20;
          fill: rand(), rand(), rand();
        );
      ` },
    { label: "rand(id)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 20;
          id: vec2(x, y);
          fill: rand(id);
        );
      ` },
    { label: "rand(id, k)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 20;
          id: vec2(x, y);
          fill: rand(id, 1), rand(id, 2), rand(id, 3);
        );
      ` },
    { label: "rand(id + 1)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 20;
          id: vec2(x, y);
          fill: rand(id + 1);
        );
      ` },
  ],
  reroll: true,
  say: "Each form on a 20 × 20 grid",
});
