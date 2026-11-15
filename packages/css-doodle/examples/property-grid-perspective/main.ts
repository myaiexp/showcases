// the ∆ modifier of @grid sets perspective and its origin
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "∆ 200px", code: `
      @grid: 5 / 100% ß1 _1px *x 45deg ∆ 200px;
      background: #e6437d;
    ` },
    { label: "∆ 200px 100% 0", code: `
      @grid: 5 / 100% ß1 _1px *x 45deg ∆ 200px 100% 0;
      background: #e6437d;
    ` },
    { label: "∆ 500px", code: `
      @grid: 5 / 100% ß1 _1px *x 60deg ∆ 500px;
      background: #e6437d;
    ` },
  ],
});
