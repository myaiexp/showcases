// Union, subtract, intersect, exclude
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "union",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              union {
                circle { scale: .7; move: -.25 0 }
                circle { scale: .7; move: .25 0 }
              }
            );
        `,
      },
      {
        label: "subtract",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              subtract {
                circle { scale: .7; move: -.25 0 }
                circle { scale: .7; move: .25 0 }
              }
            );
        `,
      },
      {
        label: "intersect",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              intersect {
                circle { scale: .7; move: -.25 0 }
                circle { scale: .7; move: .25 0 }
              }
            );
        `,
      },
      {
        label: "exclude",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              exclude {
                circle { scale: .7; move: -.25 0 }
                circle { scale: .7; move: .25 0 }
              }
            );
        `,
      },
    ],
});
