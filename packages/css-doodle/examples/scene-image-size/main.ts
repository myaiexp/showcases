// Sizes: @scene400 and @scene400x225
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@scene24", code: `
        @grid: 1 / 100%;
        @content: @scene24(
          box { size: 1; round: .15; fill: .5 + .5 * normal }
          view: 35 25;
        );
      ` },
    { label: "@scene64", code: `
        @grid: 1 / 100%;
        @content: @scene64(
          box { size: 1; round: .15; fill: .5 + .5 * normal }
          view: 35 25;
        );
      ` },
    { label: "@scene", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1; round: .15; fill: .5 + .5 * normal }
          view: 35 25;
        );
      ` },
  ],
  say: "A smaller image is stretched over the element",
});
