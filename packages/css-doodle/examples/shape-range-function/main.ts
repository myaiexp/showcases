// range runs across the points
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "range(.1, 1)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 200;
              turn: 3;
              r: range(.1, 1);
              scale: .9;
            );
        `,
      },
      {
        label: "range(1, .1)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 200;
              turn: 3;
              r: range(1, .1);
              scale: .9;
            );
        `,
      },
    ],
});
