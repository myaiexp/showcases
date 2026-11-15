// @code(65, 66) gives A,B
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@code(65, 66)", code: `
      @grid: 2 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.2em;
      @content: @code(65, 66);
    ` },
      { label: "alphabet", code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.3em;
      @content: @code($(@i + 64));
    ` },
      { label: "lower case", code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.3em;
      @content: @code($(@i + 96));
    ` },
    ],
    say: "Decimal code units 65 and up are the capital letters",
});
