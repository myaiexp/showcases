// Mirror across x, y or both
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "mirror: x",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle; scale: .3; move: .5 .5; mirror: x
            );
        `,
      },
      {
        label: "mirror: y",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle; scale: .3; move: .5 .5; mirror: y
            );
        `,
      },
      {
        label: "mirror: x y",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle; scale: .3; move: .5 .5; mirror: x y
            );
        `,
      },
    ],
});
