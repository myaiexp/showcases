// Nested match blocks, each with its own scope
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 17;
      fill: #0b132b;
      match(dc < 7) {
        fill: #1c5d99;
        match(dc < 4.5 + 2sin(t)) {
          fill: #fca311;
          match(dc < 2) {
            fill: #e63946;
          }
        }
      }
    );
  `,
  say: "The inner blocks only run where the outer test holds",
});
