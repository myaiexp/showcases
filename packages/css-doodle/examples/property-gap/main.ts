// @gap sets the gap between cells and draws a rule inside it
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@gap: 10px 20px", code: `
      @grid: 5 / 100%;
      @gap: 10px 20px;
      background: #e6437d;
    ` },
    { label: "@gap: 6px dashed", code: `
      @grid: 5 / 100%;
      @gap: 6px dashed #e6437d;
      background: #fff1;
      box-shadow: inset 0 0 0 1px #e6437d;
    ` },
    { label: "@gap: 4px #e6437d", code: `
      @grid: 8 / 100%;
      @gap: 4px #e6437d;
      background: #222;
    ` },
    { label: "@gap: 10px solid 2px", code: `
      @grid: 6 / 100%;
      @gap: 10px solid 2px #ebbf4d;
      background: #222;
    ` },
  ],
});
