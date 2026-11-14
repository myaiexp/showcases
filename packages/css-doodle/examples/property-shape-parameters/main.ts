// @shape with a number: points, petals, exponent, inner radius
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "squircle k", code: `
      @grid: 4 / 100% _2px;
      @shape: squircle @calc(@i / 4);
      background: #e6437d;
    ` },
    { label: "star points", code: `
      @grid: 4x2 / 100% auto _2px;
      @shape: star @calc(@i + 2);
      background: #e6437d;
    ` },
    { label: "clover petals", code: `
      @grid: 4x2 / 100% auto _2px;
      @shape: clover @calc(@i + 2);
      background: #e6437d;
    ` },
    { label: "star inner", code: `
      @grid: 5x2 / 100% auto _2px;
      @shape: star 5 @calc(@i / 10);
      background: #e6437d;
    ` },
  ],
});
