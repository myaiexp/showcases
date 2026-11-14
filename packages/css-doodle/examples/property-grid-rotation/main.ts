// the * modifier of @grid rotates the container by an angle
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "*15deg", code: `
      @grid: 5 / 100% ß1 _2px *15deg;
      background: #e6437d;
    ` },
    { label: "*.1turn", code: `
      @grid: 5 / 100% ß1 _2px *.1turn;
      background: #e6437d;
    ` },
    { label: "*.5rad", code: `
      @grid: 5 / 100% ß1 _2px *.5rad;
      background: #e6437d;
    ` },
    { label: "*30", code: `
      @grid: 5 / 100% ß1 _2px *30;
      background: #e6437d;
    ` },
  ],
});
