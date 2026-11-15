// Sliding points along the edge
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "edge only",
        code: `
            @grid: 40x1 / 100% / #222;
            background: hsl(@r(360) 60% 70%);
            clip-path: @tile.hex(
              edge: .15 * sin(t);
              gap: .6
            );
        `,
      },
      {
        label: "edge and slide",
        code: `
            @grid: 40x1 / 100% / #222;
            background: hsl(@r(360) 60% 70%);
            clip-path: @tile.hex(
              edge: .15 * sin(t);
              slide: .2 * sin(t / 2)^2;
              gap: .6
            );
        `,
      },
    ],
    reroll: true,
});
