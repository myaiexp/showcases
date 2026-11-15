// points: fewer pieces than cells
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "points: 60",
        code: `
            @grid: 60x1 / 100% / #3b2410;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(gap: 1.2; points: 60);
        `,
      },
      {
        label: "points: 30",
        code: `
            @grid: 60x1 / 100% / #3b2410;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(gap: 1.2; points: 30);
        `,
      },
      {
        label: "points: 12",
        code: `
            @grid: 60x1 / 100% / #3b2410;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(gap: 1.2; points: 12);
        `,
      },
      {
        label: "points: 5",
        code: `
            @grid: 60x1 / 100% / #3b2410;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(gap: 1.2; points: 5);
        `,
      },
    ],
});
