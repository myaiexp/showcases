// mirror and repeat: reflected and endless copies
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "mirror: x z", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .25; move: .5 .2 .5; mirror: x z; fill: #f06 }
          view: 30 30;
        );
      ` },
    { label: "repeat: .5 .5 .5", code: `
        @grid: 1 / 100%;
        @content: @scene(
          intersect {
            sphere { r: .8 }
            box { size: .3; round: .05; repeat: .5 .5 .5; fill: #fc0 }
          }
          view: 30 30;
        );
      ` },
    { label: "repeat: .5 0 .5", code: `
        @grid: 1 / 100%;
        @content: @scene(
          intersect {
            box { size: 1.6 1 1.6 }
            cylinder { r: .08; height: 1; repeat: .4 0 .4; fill: #0cf }
          }
          view: 30 30;
        );
      ` },
  ],
  say: "Copies without writing each one",
});
