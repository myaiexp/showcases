// A group's own commands
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "Joined",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              union {
                circle { scale: .6; move: -.25 0 }
                circle { scale: .6; move: .25 0 }
              }
            );
        `,
      },
      {
        label: "Group rotate",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              union {
                rotate: 45;
                circle { scale: .6; move: -.25 0 }
                circle { scale: .6; move: .25 0 }
              }
            );
        `,
      },
      {
        label: "Body frame",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              frame: .1;
              union {
                circle { scale: .6; move: -.25 0 }
                circle { scale: .6; move: .25 0 }
              }
            );
        `,
      },
    ],
});
