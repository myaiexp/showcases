// @abs(@sin(@x / 2) * @cos(@y / 2)) as opacity
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "/ 2", code: `
      @grid: 12 / 100% _1px;
      background: #000;
      opacity: @abs(@sin(@x / 2) * @cos(@y / 2));
    ` },
      { label: "/ 1", code: `
      @grid: 12 / 100% _1px;
      background: #000;
      opacity: @abs(@sin(@x / 1) * @cos(@y / 1));
    ` },
      { label: "/ 4", code: `
      @grid: 12 / 100% _1px;
      background: #000;
      opacity: @abs(@sin(@x / 4) * @cos(@y / 4));
    ` },
    ],
    say: "Cell values need their @ functions: @x, not x",
});
