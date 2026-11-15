// Variants without a shape
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "@plot.scatter()",
        code: `
            @grid: 90x1 / 100%;
            @size: 5%;
            border-radius: 50%;
            background: #4cc9f0;
            @place: @plot.scatter();
        `,
      },
      {
        label: "@plot.hex()",
        code: `
            @grid: 90x1 / 100%;
            @size: 5%;
            border-radius: 50%;
            background: #4cc9f0;
            @place: @plot.hex();
        `,
      },
      {
        label: "@plot.grid()",
        code: `
            @grid: 90x1 / 100%;
            @size: 5%;
            border-radius: 50%;
            background: #4cc9f0;
            @place: @plot.grid();
        `,
      },
    ],
});
