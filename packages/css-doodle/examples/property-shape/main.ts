// @shape clips each cell to a named shape; @p picks one per cell
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 5 / 100% _2px;
    @shape: @p(circle, star, heart, hexagon);
    background: #e6437d;
    transition: .6s;
  `,
  reroll: true,
});
