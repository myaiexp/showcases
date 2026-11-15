// subtract and intersect: a rounded cube with three holes
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      subtract {
        intersect {
          box { size: 1 }
          sphere { r: .68 }
        }
        cylinder { r: .3; height: 2 }
        cylinder { r: .3; height: 2; rotate: x 90 }
        cylinder { r: .3; height: 2; rotate: z 90 }
      }
      view: 30t 25;
    );
  `,
  say: "A cube, a sphere, three cylinders",
});
