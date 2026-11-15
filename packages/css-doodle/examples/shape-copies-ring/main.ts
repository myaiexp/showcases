// Copies around a ring
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "circle*3",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle*3 {
                scale: .2;
                move: 0 -.6;
                rotate: n * 120;
              }
            );
        `,
      },
      {
        label: "circle*6",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle*6 {
                scale: .2;
                move: 0 -.6;
                rotate: n * 60;
              }
            );
        `,
      },
      {
        label: "circle*9",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle*9 {
                scale: .2;
                move: 0 -.6;
                rotate: n * 40;
              }
            );
        `,
      },
    ],
});
