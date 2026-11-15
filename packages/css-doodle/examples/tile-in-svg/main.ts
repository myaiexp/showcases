// Tile pieces as SVG path data
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100% / #f4f1ea;
      background: @svg(
        viewBox: -1 -1 2 2;
        path*30 {
          d: @tile.voronoi(points: 30);
          fill: hsl(@calc(@n * 12), 60%, 70%);
          stroke: #fff;
          stroke-width: .01;
        }
      );
    `,
    reroll: true,
});
