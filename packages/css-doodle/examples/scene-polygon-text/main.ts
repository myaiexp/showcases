// polygon { text: A }: a solid letter
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "A", code: `
        @grid: 1 / 100%;
        @content: @scene(
          polygon { text: A; depth: .3; fill: #fca311 }
          view: 30 20;
        );
      ` },
    { label: "g", code: `
        @grid: 1 / 100%;
        @content: @scene(
          polygon { text: g; depth: .3; fill: #fca311 }
          view: 30 20;
        );
      ` },
    { label: "@", code: `
        @grid: 1 / 100%;
        @content: @scene(
          polygon { text: @; depth: .3; fill: #fca311 }
          view: 30 20;
        );
      ` },
    { label: "Hi", code: `
        @grid: 1 / 100%;
        @content: @scene(
          polygon { text: Hi; depth: .3; fill: #fca311 }
          view: 30 20;
        );
      ` },
  ],
  say: "Text is turned into outlines, then extruded",
});
