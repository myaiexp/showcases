// @grid sets columns and rows: one number, two numbers, other separators
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "3", code: `
      @grid: 3 / 100%;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "3x3", code: `
      @grid: 3x3 / 100%;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "5x2", code: `
      @grid: 5x2 / 100%;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "2X6", code: `
      @grid: 2X6 / 100%;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "8,3", code: `
      @grid: 8,3 / 100%;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "1x30", code: `
      @grid: 1x30 / 100%;
      background: #e6437d;
      margin: 1px;
    ` },
  ],
  say: "Columns by rows; one number means a square",
});
