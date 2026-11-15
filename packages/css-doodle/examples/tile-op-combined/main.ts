// Combining operator letters
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "op: tk",
        code: `
            @grid: 80x1 / 100% / #222;
            background: hsl(@r(20, 60) 70% @r(45, 70)%);
            clip-path: @tile.hex(op: tk; gap: .6);
        `,
      },
      {
        label: "op: kt",
        code: `
            @grid: 80x1 / 100% / #222;
            background: hsl(@r(20, 60) 70% @r(45, 70)%);
            clip-path: @tile.hex(op: kt; gap: .6);
        `,
      },
      {
        label: "op: dt",
        code: `
            @grid: 80x1 / 100% / #222;
            background: hsl(@r(20, 60) 70% @r(45, 70)%);
            clip-path: @tile.hex(op: dt; gap: .6);
        `,
      },
      {
        label: "op: ta",
        code: `
            @grid: 80x1 / 100% / #222;
            background: hsl(@r(20, 60) 70% @r(45, 70)%);
            clip-path: @tile.hex(op: ta; gap: .6);
        `,
      },
      {
        label: "op: tQ",
        code: `
            @grid: 80x1 / 100% / #222;
            background: hsl(@r(20, 60) 70% @r(45, 70)%);
            clip-path: @tile.hex(op: tQ; gap: .6);
        `,
      },
    ],
    reroll: true,
});
