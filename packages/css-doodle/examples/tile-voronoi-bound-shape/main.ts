// Bound the regions to the shape
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "bound: shape",
        code: `
            @grid: 80x1 / 100%;
            background: #000;
            clip-path: @tile.voronoi(
              subtract { circle {} circle { r: .5 } }
              bound: shape;
              gap: 1;
            );
        `,
      },
      {
        label: "bound: box",
        code: `
            @grid: 80x1 / 100%;
            background: #000;
            clip-path: @tile.voronoi(
              subtract { circle {} circle { r: .5 } }
              bound: box;
              gap: 1;
            );
        `,
      },
    ],
});
