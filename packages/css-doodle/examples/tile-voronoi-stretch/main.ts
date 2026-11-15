// Stretched regions
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "stretch: 2.5 90",
        code: `
            @grid: 160x1 / 100% / #0c1d1f;
            background: linear-gradient(#5fd3c7, #155e75);
            clip-path: @tile.voronoi(stretch: 2.5 90; round: 1; gap: .7);
        `,
      },
      {
        label: "stretch: 3",
        code: `
            @grid: 160x1 / 100% / #0c1d1f;
            background: linear-gradient(#5fd3c7, #155e75);
            clip-path: @tile.voronoi(stretch: 3; round: 1; gap: .7);
        `,
      },
      {
        label: "stretch: 4 45",
        code: `
            @grid: 160x1 / 100% / #0c1d1f;
            background: linear-gradient(#5fd3c7, #155e75);
            clip-path: @tile.voronoi(stretch: 4 45; round: 1; gap: .7);
        `,
      },
    ],
});
