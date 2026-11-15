// Smooth joins in a group
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "smooth: 0",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              union {
                smooth: 0;
                circle { scale: .5; move: -.3 0 }
                circle { scale: .35; move: .35 .15 }
              }
            );
        `,
      },
      {
        label: "smooth: 0.1",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              union {
                smooth: 0.1;
                circle { scale: .5; move: -.3 0 }
                circle { scale: .35; move: .35 .15 }
              }
            );
        `,
      },
      {
        label: "smooth: 0.2",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              union {
                smooth: 0.2;
                circle { scale: .5; move: -.3 0 }
                circle { scale: .35; move: .35 .15 }
              }
            );
        `,
      },
      {
        label: "smooth: 0.4",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              union {
                smooth: 0.4;
                circle { scale: .5; move: -.3 0 }
                circle { scale: .35; move: .35 .15 }
              }
            );
        `,
      },
    ],
});
