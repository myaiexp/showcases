// @reverse.$colors flips a custom property list
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1x2 / 100% _2px;
      --colors: #000, #e6437d, #ebbf4d;
      @cell(1) {
        background: linear-gradient(90deg, $colors);
      }
      @cell(2) {
        background: linear-gradient(90deg, @reverse.$colors);
      }
    `,
    say: "linear-gradient(90deg, $colors) above, @reverse.$colors below",
});
