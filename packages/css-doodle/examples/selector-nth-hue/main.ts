// both pick the same cells on a plain grid and give each its own hue
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "@nth(2n)", code: `
      @grid: 5x5 / 100% _1px;
      background: #333;
      
      @nth(2n) {
        background: hsl(@i(*14), 78%, 62%);
      }
    ` },
    { label: ":nth-child(2n)", code: `
      @grid: 5x5 / 100% _1px;
      background: #333;
      
      :nth-child(2n) {
        background: hsl(@i(*14), 78%, 62%);
      }
    ` },
  ],
  say: "Same cells, same hues",
});
