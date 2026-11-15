// the row and col flags switch @grid from grid layout to flexbox
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "col 4", code: `
      @grid: col 4 / 100% _2px;
      background: #e6437d;
      flex: @i;
    ` },
    { label: "row 6", code: `
      @grid: row 6 / 100% _2px;
      background: #e6437d;
      flex: @r(1, 3);
    ` },
  ],
});
