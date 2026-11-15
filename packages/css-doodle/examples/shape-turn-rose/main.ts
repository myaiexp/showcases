// Going around more than once
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "turn: 1",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              turn: 1;
              r: cos(5t/3);
              scale: .9;
            );
        `,
      },
      {
        label: "turn: 3",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              turn: 3;
              r: cos(5t/3);
              scale: .9;
            );
        `,
      },
    ],
});
