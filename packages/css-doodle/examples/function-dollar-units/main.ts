// $deg, $turn, $px and $% append a unit
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "$deg", code: `
      @grid: 12x1 / 100%;
      @place: center;
      @size: 40% 3px;
      background: #000;
      margin: auto;
      transform-origin: 0 50%;
      rotate: $deg(360 / @I * @i);
    ` },
      { label: "$turn", code: `
      @grid: 12x1 / 100%;
      @place: center;
      @size: 40% 3px;
      background: #000;
      margin: auto;
      transform-origin: 0 50%;
      rotate: $turn(@i / @I);
    ` },
      { label: "half turn", code: `
      @grid: 12x1 / 100%;
      @place: center;
      @size: 40% 3px;
      background: #000;
      margin: auto;
      transform-origin: 0 50%;
      rotate: $deg(180 / @I * @i);
    ` },
    ],
    say: "rotate: $deg(360 / @I * @i), then $turn(@i / @I)",
});
