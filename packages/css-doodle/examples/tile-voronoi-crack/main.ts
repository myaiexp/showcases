// Cracks group the regions
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "crack: 6",
        code: `
            @grid: 300x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 calc(@tile.k * 72));
            clip-path: @tile.voronoi(crack: 6; relax: 0; gap: 1.6 .3);
        `,
      },
      {
        label: "crack: 12",
        code: `
            @grid: 300x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 calc(@tile.k * 72));
            clip-path: @tile.voronoi(crack: 12; relax: 0; gap: 1.6 .3);
        `,
      },
      {
        label: "crack: 30",
        code: `
            @grid: 300x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 calc(@tile.k * 72));
            clip-path: @tile.voronoi(crack: 30; relax: 0; gap: 1.6 .3);
        `,
      },
    ],
});
