// fill as an expression in p
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "along x", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: mix(#f06, #0cf, p.x + .5) }
          view: 20 50;
        );
      ` },
    { label: "along y", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: mix(#fca311, #3a86ff, p.y * 3 + .5) }
          view: 20 50;
        );
      ` },
    { label: "stripes", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: mix(#fff, #14213d, step(.5, fract(p.x * 6))) }
          view: 20 50;
        );
      ` },
  ],
  say: "p is the point on the surface",
});
