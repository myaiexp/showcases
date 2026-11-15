// Hexagons filling a letter
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "text: O",
        code: `
            @grid: 120x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(
              text: O;
              font: 900 sans-serif;
              gap: 1;
            );
        `,
      },
      {
        label: "text: A",
        code: `
            @grid: 120x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(
              text: A;
              font: 900 sans-serif;
              gap: 1;
            );
        `,
      },
      {
        label: "text: S",
        code: `
            @grid: 120x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(
              text: S;
              font: 900 sans-serif;
              gap: 1;
            );
        `,
      },
    ],
});
