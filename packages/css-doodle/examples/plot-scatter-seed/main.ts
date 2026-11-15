// The seed of a scatter
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "seed: 1",
        code: `
            @grid: 100x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e9c46a;
            @place: @plot.scatter(star; scale: .9; seed: 1);
        `,
      },
      {
        label: "seed: 2",
        code: `
            @grid: 100x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e9c46a;
            @place: @plot.scatter(star; scale: .9; seed: 2);
        `,
      },
      {
        label: "seed: 3",
        code: `
            @grid: 100x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e9c46a;
            @place: @plot.scatter(star; scale: .9; seed: 3);
        `,
      },
    ],
});
