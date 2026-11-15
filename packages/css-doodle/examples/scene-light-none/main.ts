// light: none leaves fill as the final color
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "default light", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: #fca311 }
          view: 20 50;
        );
      ` },
    { label: "light: none", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: #fca311 }
          view: 20 50;
          light: none;
        );
      ` },
    { label: "light: -1 1 .5 .4", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: #fca311 }
          view: 20 50;
          light: -1 1 .5 .4;
        );
      ` },
  ],
  say: "A number after the direction is a white light's strength",
});
