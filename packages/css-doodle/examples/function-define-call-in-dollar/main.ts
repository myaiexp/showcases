// $(2 * $inc(3)) is 8, and inc(3) works too
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "$inc(3)", code: `
      @grid: 4x1 / 100%;
      --inc(x): x + 1;
      background: #000;
      color: #fff;
      font-size: 1.6em;
      @content: $(2 * $inc(@i));
    ` },
      { label: "inc(3)", code: `
      @grid: 4x1 / 100%;
      --inc(x): x + 1;
      background: #000;
      color: #fff;
      font-size: 1.6em;
      @content: $(2 * inc(@i));
    ` },
    ],
    say: "Both forms give the same numbers",
});
