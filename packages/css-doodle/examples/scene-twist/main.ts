// twist: degrees of turn for each unit up y
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "twist: 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5 1.5 .5; twist: 0; fill: #0cf }
          view: 30 15;
        );
      ` },
    { label: "twist: 45", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5 1.5 .5; twist: 45; fill: #0cf }
          view: 30 15;
        );
      ` },
    { label: "twist: 90", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5 1.5 .5; twist: 90; fill: #0cf }
          view: 30 15;
        );
      ` },
    { label: "twist: 180", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5 1.5 .5; twist: 180; fill: #0cf }
          view: 30 15;
        );
      ` },
  ],
  say: "The higher up, the more it is turned",
});
