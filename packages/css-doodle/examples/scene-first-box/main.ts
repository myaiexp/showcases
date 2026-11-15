// A first @scene: a rounded box and a view row
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "35 25", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1; round: .1; fill: #f06 }
          view: 35 25;
        );
      ` },
    { label: "-40 15", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1; round: .1; fill: #f06 }
          view: -40 15;
        );
      ` },
    { label: "90 60", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1; round: .1; fill: #f06 }
          view: 90 60;
        );
      ` },
    { label: "0 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1; round: .1; fill: #f06 }
          view: 0 0;
        );
      ` },
  ],
  say: "The model has no background of its own",
});
