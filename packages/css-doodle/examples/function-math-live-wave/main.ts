// @sin(@ts + @i / 4) becomes CSS math and keeps moving
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1x60 / 100%;
      @size: 65% 1px;
      margin: auto;
      background: #000;
      opacity: @iI;
      rotate: -15deg;
      translate: calc(@sin(@ts + @i / 4) * π * 5%);
    `,
    say: "translate: calc(@sin(@ts + @i / 4) * π * 5%)",
});
