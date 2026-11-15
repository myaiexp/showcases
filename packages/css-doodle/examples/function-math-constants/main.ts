// @PI, @E and π print their values
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@PI", code: `
      @grid: 1 / 100%;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: @PI;
    ` },
      { label: "@E", code: `
      @grid: 1 / 100%;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: @E;
    ` },
      { label: "@SQRT2", code: `
      @grid: 1 / 100%;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: @SQRT2;
    ` },
      { label: "@round(@PI * 100)", code: `
      @grid: 1 / 100%;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: @round(@PI * 100);
    ` },
    ],
    say: "Plain numbers, without a unit",
});
