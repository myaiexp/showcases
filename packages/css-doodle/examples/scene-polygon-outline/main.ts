// polygon: a @shape outline given depth
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "heart", code: `
        @grid: 1 / 100%;
        @content: @scene(
          polygon { heart; depth: .3; fill: #e33 }
          view: 30 20;
        );
      ` },
    { label: "star 5 .4", code: `
        @grid: 1 / 100%;
        @content: @scene(
          polygon { star 5 .4; depth: .3; fill: #e33 }
          view: 30 20;
        );
      ` },
    { label: "hexagon", code: `
        @grid: 1 / 100%;
        @content: @scene(
          polygon { hexagon; depth: .3; fill: #e33 }
          view: 30 20;
        );
      ` },
  ],
  say: "The outline language is the same as @shape",
});
