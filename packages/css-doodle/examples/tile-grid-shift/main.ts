// Grid shift for bricks
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "shift: 0",
        code: `
            @grid: 60x1 / 100% / #eee6dc;
            background: hsl(@R(120, 240, 2, 8) 60% 50%);
            clip-path: @tile.grid(shift: 0; gap: .8);
        `,
      },
      {
        label: "shift: 0.5",
        code: `
            @grid: 60x1 / 100% / #eee6dc;
            background: hsl(@R(120, 240, 2, 8) 60% 50%);
            clip-path: @tile.grid(shift: 0.5; gap: .8);
        `,
      },
      {
        label: "shift: 0.25",
        code: `
            @grid: 60x1 / 100% / #eee6dc;
            background: hsl(@R(120, 240, 2, 8) 60% 50%);
            clip-path: @tile.grid(shift: 0.25; gap: .8);
        `,
      },
    ],
    reroll: true,
});
