// Voronoi density: more points at the bottom
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "density: 1 - y",
        code: `
            @grid: 120x1 / 100% / #000;
            background: #fff;
            clip-path: @tile.voronoi(density: 1 - y; gap: .6);
        `,
      },
      {
        label: "density: y",
        code: `
            @grid: 120x1 / 100% / #000;
            background: #fff;
            clip-path: @tile.voronoi(density: y; gap: .6);
        `,
      },
      {
        label: "density: d",
        code: `
            @grid: 120x1 / 100% / #000;
            background: #fff;
            clip-path: @tile.voronoi(density: d; gap: .6);
        `,
      },
    ],
    reroll: true,
});
