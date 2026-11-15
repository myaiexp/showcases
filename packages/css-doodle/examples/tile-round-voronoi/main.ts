// Round corners of pieces
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "round: 0",
        code: `
            @grid: 100x1 / 100% / #2d2a26;
            background: hsl(30 8% @r(62, 80)%);
            clip-path: @tile.voronoi(round: 0; gap: 1.4; seed: 5);
        `,
      },
      {
        label: "round: 0.5",
        code: `
            @grid: 100x1 / 100% / #2d2a26;
            background: hsl(30 8% @r(62, 80)%);
            clip-path: @tile.voronoi(round: 0.5; gap: 1.4; seed: 5);
        `,
      },
      {
        label: "round: 1",
        code: `
            @grid: 100x1 / 100% / #2d2a26;
            background: hsl(30 8% @r(62, 80)%);
            clip-path: @tile.voronoi(round: 1; gap: 1.4; seed: 5);
        `,
      },
      {
        label: "round: 2",
        code: `
            @grid: 100x1 / 100% / #2d2a26;
            background: hsl(30 8% @r(62, 80)%);
            clip-path: @tile.voronoi(round: 2; gap: 1.4; seed: 5);
        `,
      },
    ],
});
