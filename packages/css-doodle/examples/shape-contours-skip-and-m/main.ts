// points: 0 and @m for long lists
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "Eight rings",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 100;
              r: @m8(@n / 8);
              fill-rule: evenodd;
              scale: .9;
            );
        `,
      },
      {
        label: "One left out",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 100, 100, 0, 100, 100, 100, 100, 100;
              r: @m8(@n / 8);
              fill-rule: evenodd;
              scale: .9;
            );
        `,
      },
    ],
});
