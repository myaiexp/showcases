// A doodle texture: texture(texture0, uv) tiles a drawing
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "4uv", code: `
        @grid: 1 / 100% / #f4efe6;
        @content: @pattern(
          texture0 {
            @shape: heart;
            background: #000;
          }
          fill: texture(texture0, 4uv);
        );
      ` },
    { label: "3uv", code: `
        @grid: 1 / 100% / #f4efe6;
        @content: @pattern(
          texture0 {
            @shape: heart;
            background: #000;
          }
          fill: texture(texture0, 3uv);
        );
      ` },
    { label: "6uv", code: `
        @grid: 1 / 100% / #f4efe6;
        @content: @pattern(
          texture0 {
            @shape: heart;
            background: #000;
          }
          fill: texture(texture0, 6uv);
        );
      ` },
    { label: "8uv", code: `
        @grid: 1 / 100% / #f4efe6;
        @content: @pattern(
          texture0 {
            @shape: heart;
            background: #000;
          }
          fill: texture(texture0, 8uv);
        );
      ` },
  ],
  say: "The texture repeats past its edges",
});
