// lathe: turning the right half of an outline around y
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "vase", code: `
        @grid: 1 / 100%;
        @content: @scene(
          lathe { vase; fill: #4a8 }
          view: 0 20;
        );
      ` },
    { label: "heart", code: `
        @grid: 1 / 100%;
        @content: @scene(
          lathe { heart; fill: #4a8 }
          view: 0 20;
        );
      ` },
    { label: "circle", code: `
        @grid: 1 / 100%;
        @content: @scene(
          lathe { circle; fill: #4a8 }
          view: 0 20;
        );
      ` },
  ],
  say: "The left half of the outline is ignored",
});
