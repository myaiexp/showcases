// Cairo pentagons with op: g
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "op: g",
        code: `
            @grid: 80x1 / 100% / #222;
            background: hsl(@r(190, 230) 55% @r(45, 70)%);
            clip-path: @tile.grid(op: g; gap: .8);
        `,
      },
      {
        label: "op: ds",
        code: `
            @grid: 80x1 / 100% / #222;
            background: hsl(@r(190, 230) 55% @r(45, 70)%);
            clip-path: @tile.grid(op: ds; gap: .8);
        `,
      },
    ],
    reroll: true,
});
