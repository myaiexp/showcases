// Relax evens out the points
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "relax: 0",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: oklch(.75 .12 calc(@tile.k * 72));
            clip-path: @tile.voronoi(gap: .8; relax: 0; seed: 4);
        `,
      },
      {
        label: "relax: 2",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: oklch(.75 .12 calc(@tile.k * 72));
            clip-path: @tile.voronoi(gap: .8; relax: 2; seed: 4);
        `,
      },
      {
        label: "relax: 10",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: oklch(.75 .12 calc(@tile.k * 72));
            clip-path: @tile.voronoi(gap: .8; relax: 10; seed: 4);
        `,
      },
      {
        label: "relax: 50",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: oklch(.75 .12 calc(@tile.k * 72));
            clip-path: @tile.voronoi(gap: .8; relax: 50; seed: 4);
        `,
      },
    ],
});
