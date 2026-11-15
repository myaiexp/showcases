// Lattices over presets
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "heart",
        code: `
            @grid: 80x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(heart; gap: .8);
        `,
      },
      {
        label: "star",
        code: `
            @grid: 80x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(star; gap: .8);
        `,
      },
      {
        label: "drop",
        code: `
            @grid: 80x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(drop; gap: .8);
        `,
      },
      {
        label: "hexagon",
        code: `
            @grid: 80x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(hexagon; gap: .8);
        `,
      },
    ],
    reroll: true,
});
