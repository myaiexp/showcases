// atan(y, x) is the angle of a point, as a hue
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "wheel", code: `
      @grid: 9 / 100%;
      background: hsl($(degrees(atan(y - 5, x - 5))), 80%, 55%);
    ` },
      { label: "fade to center", code: `
      @grid: 9 / 100%;
      background: hsl($(degrees(atan(y - 5, x - 5))), 80%, $%(30 + @dr * 10));
    ` },
      { label: "rings", code: `
      @grid: 9 / 100%;
      background: hsl($(@dr * 60), 80%, 55%);
    ` },
    ],
    say: "hsl($(degrees(atan(y - 5, x - 5))), …)",
});
