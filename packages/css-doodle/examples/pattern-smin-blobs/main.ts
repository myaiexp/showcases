// smin(a, b, k): distances that melt into each other
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "min", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          a: length(pos - .25vec2(cos(t), sin(1.3t))) - .12;
          b: length(pos + .25vec2(cos(.8t), sin(t))) - .14;
          c: length(pos - .2vec2(sin(1.1t), cos(.7t))) - .1;
          d: min(min(a, b), c);
          fill: #0b132b;
          fill: #ffbe0b, shape(d);
        );
      ` },
    { label: "smin(…, .2)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          a: length(pos - .25vec2(cos(t), sin(1.3t))) - .12;
          b: length(pos + .25vec2(cos(.8t), sin(t))) - .14;
          c: length(pos - .2vec2(sin(1.1t), cos(.7t))) - .1;
          d: smin(smin(a, b, .2), c, .2);
          fill: #0b132b;
          fill: #ffbe0b, shape(d);
        );
      ` },
  ],
  say: "The same three discs, joined two ways",
});
