// $(@i * 2) works out an expression to a number
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@i * 2", code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      @content: $(@i * 2);
    ` },
      { label: "@i % 7", code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      @content: $(@i % 7);
    ` },
      { label: "2 ^ (@x - 1)", code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      @content: $(2 ^ (@x - 1));
    ` },
      { label: "@i > 12", code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      @content: $(@i > 12);
    ` },
    ],
    say: "Functions inside $() run first, then the arithmetic",
});
