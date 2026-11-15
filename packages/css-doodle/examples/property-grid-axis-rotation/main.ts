// the * modifier takes x, y or z, or three numbers for an axis of your own
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "*y 65deg", code: `
      @grid: 5 / 100% _2px *y 65deg;
      background: #e6437d;
    ` },
    { label: "*x 45", code: `
      @grid: 5 / 100% _2px *x 45;
      background: #e6437d;
    ` },
    { label: "*z 20deg", code: `
      @grid: 5 / 100% _2px *z 20deg;
      background: #e6437d;
    ` },
    { label: "*1 1 0 30", code: `
      @grid: 5 / 100% _2px *1 1 0 30;
      background: #e6437d;
    ` },
  ],
});
