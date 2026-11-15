// Parametric curves with x and y
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "Heart",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 200;
              x: sin(t)^3;
              y: (13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t))/16;
              scale: .9;
            );
        `,
      },
      {
        label: "Lissajous",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              x: sin(3t);
              y: sin(2t);
              scale: .9;
              fill-rule: evenodd;
            );
        `,
      },
    ],
    say: "x and y are used only when there is no r",
});
