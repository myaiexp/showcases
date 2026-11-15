// Grow as an expression
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "sin(24t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              scale: .8;
              grow: .03 * sin(24t);
            );
        `,
      },
      {
        label: "sin(12t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              scale: .8;
              grow: .05 * sin(12t);
            );
        `,
      },
      {
        label: "sin(40t)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              scale: .8;
              grow: .02 * sin(40t);
            );
        `,
      },
    ],
});
