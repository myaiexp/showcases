// A letter in hexagon points
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "text: B",
        code: `
            @grid: 240x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e6437d;
            @place: @plot.hex(
              text: B;
              font: 900 sans-serif;
              scale: .9;
            );
        `,
      },
      {
        label: "text: S",
        code: `
            @grid: 240x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e6437d;
            @place: @plot.hex(
              text: S;
              font: 900 sans-serif;
              scale: .9;
            );
        `,
      },
      {
        label: "text: Q",
        code: `
            @grid: 240x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e6437d;
            @place: @plot.hex(
              text: Q;
              font: 900 sans-serif;
              scale: .9;
            );
        `,
      },
    ],
});
