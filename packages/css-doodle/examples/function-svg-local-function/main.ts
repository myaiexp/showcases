// --dots(): circle*9 { } called as $dots()
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "one set", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --dots(c): circle*9 { cx: $(mod(n - 1, 3) * 3 + 2); cy: $(floor((n - 1) / 3) * 3 + 2); r: 1; fill: $c }
        $dots(#e6437d)
      );
    ` },
      { label: "two sets", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --dots(c, s): circle*9 { cx: $(mod(n - 1, 3) * 3 + 2); cy: $(floor((n - 1) / 3) * 3 + 2); r: $s; fill: $c }
        $dots(#000, 1.4)
        $dots(#e6437d, .5)
      );
    ` },
    ],
    say: "--dots(c): circle*9 { … }",
});
