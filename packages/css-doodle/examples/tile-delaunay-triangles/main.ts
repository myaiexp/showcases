// Delaunay triangles
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "points: 5",
        code: `
            @grid: 60x1 / 100%;
            background: #000;
            clip-path: @tile.delaunay(circle; points: 5; gap: 1);
        `,
      },
      {
        label: "points: 9",
        code: `
            @grid: 60x1 / 100%;
            background: #000;
            clip-path: @tile.delaunay(circle; points: 9; gap: 1);
        `,
      },
      {
        label: "points: 20",
        code: `
            @grid: 60x1 / 100%;
            background: #000;
            clip-path: @tile.delaunay(circle; points: 20; gap: 1);
        `,
      },
    ],
    reroll: true,
});
