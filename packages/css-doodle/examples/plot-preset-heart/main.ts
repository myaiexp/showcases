// Plot along a preset
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "heart",
        code: `
            @grid: 40x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e6437d;
            @place: @plot(heart; scale: .9);
        `,
      },
      {
        label: "star",
        code: `
            @grid: 40x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e6437d;
            @place: @plot(star; scale: .9);
        `,
      },
      {
        label: "drop",
        code: `
            @grid: 40x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e6437d;
            @place: @plot(drop; scale: .9);
        `,
      },
      {
        label: "triangle",
        code: `
            @grid: 40x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e6437d;
            @place: @plot(triangle; scale: .9);
        `,
      },
    ],
});
