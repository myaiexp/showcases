// Polar rose from r in t
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "cos(2t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              r: cos(2t);
              scale: .9;
            );
        `,
      },
      {
        label: "cos(3t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              r: cos(3t);
              scale: .9;
            );
        `,
      },
      {
        label: "cos(4t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              r: cos(4t);
              scale: .9;
            );
        `,
      },
      {
        label: "cos(5t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              r: cos(5t);
              scale: .9;
            );
        `,
      },
    ],
    say: "r: cos(4t) over 300 points",
});
