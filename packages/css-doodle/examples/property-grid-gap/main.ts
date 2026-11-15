// the _ modifier of @grid sets the gap and draws a rule in it
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "_10px 2px", code: `
      @grid: 4 / 100% _10px 2px;
      background: #e6437d;
    ` },
    { label: "_1px dashed", code: `
      @grid: 5 / 100% _6px dashed #e6437d;
      background: #fff2;
    ` },
    { label: "_4px #e6437d", code: `
      @grid: 6 / 100% _4px #e6437d;
      background: #222;
    ` },
  ],
});
