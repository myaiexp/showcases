// @match(x = y, ...) in @content
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "x = y", code: `
      @grid: 7 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.3em;
      @content: @match(x = y, '✓', '');
    ` },
      { label: "x + y = 8", code: `
      @grid: 7 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.3em;
      @content: @match(x + y = 8, '✓', '');
    ` },
      { label: "x = 1 || y = 1", code: `
      @grid: 7 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.3em;
      @content: @match(x = 1 || y = 1 || x = 7 || y = 7, '✓', '');
    ` },
    ],
    say: "@match(x = y, '✓', '')",
});
