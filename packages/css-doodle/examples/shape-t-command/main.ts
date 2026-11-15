// Rewriting the angle with t
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "plain",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 120;
              r: .6 + .3cos(6t);
              scale: .9;
            );
        `,
      },
      {
        label: "t: t + .6sin(t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 120;
              t: t + .6sin(t);
              r: .6 + .3cos(6t);
              scale: .9;
            );
        `,
      },
      {
        label: "t: t^2 / 6.28",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 120;
              t: t^2 / 6.28;
              r: .6 + .3cos(6t);
              scale: .9;
            );
        `,
      },
    ],
});
