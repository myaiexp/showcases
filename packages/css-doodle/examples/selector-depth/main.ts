// @depth picks cells of a grid with a third number, such as 1x1x8
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@depth(even)", code: `
      @grid: 1x1x8 / 100%;
      @size: 80%;
      margin: auto;
      border-radius: 50%;
      background: #e6437d;
      
      @depth(even) {
        background: #fff;
      }
    ` },
    { label: "@z(1, 4)", code: `
      @grid: 1x1x8 / 100%;
      @size: 80%;
      margin: auto;
      border-radius: 50%;
      background: #333;
      
      @z(1, 4) {
        background: #ebbf4d;
      }
    ` },
    { label: "@depth not (1)", code: `
      @grid: 1x1x8 / 100%;
      @size: 80%;
      margin: auto;
      border-radius: 50%;
      background: #e6437d;
      
      @depth not (1) {
        background: #fff;
      }
    ` },
  ],
});
