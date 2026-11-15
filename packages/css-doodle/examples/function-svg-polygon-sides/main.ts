// @svg-polygon(points: N) draws regular polygons
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 3 / 100% _1px;
      animation: spin 8s linear infinite;
      @keyframes spin { to { rotate: 360deg } }
      background: @svg-polygon(
        points: @pn(3, 4, 5, 6, 7, 8, 9, 10, 12);
        stroke-width: .04;
      );
    `,
    say: "Without a stroke the outline is black",
});
