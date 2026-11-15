// A fill that reads light: toon bands, shadows too
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "4 bands", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .4; move: 0 .1 0 }
          box { size: 2 .1 2; move: 0 -.35 0 }
          fill: mix(#5e6472, #e9d8a6, floor(light * 4) / 4);
          view: 30 30;
          shadow: 1;
        );
      ` },
    { label: "2 bands", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .4; move: 0 .1 0 }
          box { size: 2 .1 2; move: 0 -.35 0 }
          fill: mix(#5e6472, #e9d8a6, floor(light * 2) / 2);
          view: 30 30;
          shadow: 1;
        );
      ` },
    { label: "8 bands", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .4; move: 0 .1 0 }
          box { size: 2 .1 2; move: 0 -.35 0 }
          fill: mix(#5e6472, #e9d8a6, floor(light * 8) / 8);
          view: 30 30;
          shadow: 1;
        );
      ` },
  ],
  say: "Fewer bands, flatter look",
});
