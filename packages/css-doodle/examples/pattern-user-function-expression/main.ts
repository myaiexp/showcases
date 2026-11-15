// A one-expression user function: --ring(r, w)
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100% / #101820;
    --ring(r, w): shape(abs(length(pos) - r), w);
    @content: @pattern(
      fill: #fca311, $ring(.15 + .03sin(t), .02);
      fill: #e63946, $ring(.3 + .03sin(t + 1), .02);
      fill: #2a9d8f, $ring(.44, .02 + .015sin(t));
    );
  `,
  say: "One definition, three rings",
});
