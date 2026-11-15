// $deg(@t / 100 * @i) turns each line at its own speed
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 12x1 / 100%;
      @place: center;
      @size: 40% 3px;
      background: #000;
      margin: auto;
      transform-origin: 0 50%;
      rotate: $deg(@t / 100 * @i);
    `,
    say: "rotate: $deg(@t / 100 * @i) is calc() on a live time",
});
