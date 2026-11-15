// Where the points land: seed
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "seed: 1",
        code: `
            @grid: 40x1 / 100% / #1b1b1b;
            background: oklch(.75 .12 calc(@tile.k * 72));
            clip-path: @tile.voronoi(gap: .8; seed: 1);
        `,
      },
      {
        label: "seed: 2",
        code: `
            @grid: 40x1 / 100% / #1b1b1b;
            background: oklch(.75 .12 calc(@tile.k * 72));
            clip-path: @tile.voronoi(gap: .8; seed: 2);
        `,
      },
      {
        label: "seed: 3",
        code: `
            @grid: 40x1 / 100% / #1b1b1b;
            background: oklch(.75 .12 calc(@tile.k * 72));
            clip-path: @tile.voronoi(gap: .8; seed: 3);
        `,
      },
    ],
});
