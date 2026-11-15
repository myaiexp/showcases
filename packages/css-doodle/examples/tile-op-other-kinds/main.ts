// Operators on other kinds
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "@tile.grid",
        code: `
            @grid: 150x1 / 100% / #111;
            background: hsl(@r(360) 55% @r(40, 70)%);
            clip-path: @tile.grid(op: k; gap: .5);
        `,
      },
      {
        label: "@tile.triangle",
        code: `
            @grid: 150x1 / 100% / #111;
            background: hsl(@r(360) 55% @r(40, 70)%);
            clip-path: @tile.triangle(op: k; gap: .5);
        `,
      },
      {
        label: "@tile.penrose",
        code: `
            @grid: 150x1 / 100% / #111;
            background: hsl(@r(360) 55% @r(40, 70)%);
            clip-path: @tile.penrose(op: k; gap: .5);
        `,
      },
      {
        label: "@tile.voronoi",
        code: `
            @grid: 150x1 / 100% / #111;
            background: hsl(@r(360) 55% @r(40, 70)%);
            clip-path: @tile.voronoi(op: k; gap: .5);
        `,
      },
    ],
    reroll: true,
});
