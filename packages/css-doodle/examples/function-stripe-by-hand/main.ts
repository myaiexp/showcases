// @stripe replaces hand-computed stop positions
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "one stop each", code: `
      @grid: 1 / 100%;
      background: conic-gradient(
        @m3((
          @pn(gold, orange, crimson) calc((@n - 1) * 100% / 3),
          @lp calc(@n * 100% / 3)
        ))
      );
    ` },
      { label: "two positions", code: `
      @grid: 1 / 100%;
      background: conic-gradient(
        @m3(
          @pn(gold, orange, crimson) 0 calc(@n * 100% / 3)
        )
      );
    ` },
      { label: "@stripe", code: `
      @grid: 1 / 100%;
      background: conic-gradient(
        @stripe(gold, orange, crimson)
      );
    ` },
    ],
    say: "Same picture each time; the code gets shorter",
});
