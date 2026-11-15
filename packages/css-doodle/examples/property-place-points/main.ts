// @place takes a cell out of the grid and centres it on a point
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 5x1 / 100% ß #888;
    :doodle {
      scale: .85;
      contain: none;
    }
    @size: 1.6em;
    @content: @i;
    background: #e6437d;
    color: #fff;
    animation: bob 1.4s ease-in-out infinite alternate;
    animation-delay: calc(@i * -.3s);
    @keyframes bob {
      to { scale: 1.25 }
    }
    
    @cell(1) { @place: 0 top }
    @cell(2) { @place: right 25% }
    @cell(3) { @size: 3.2em; @place: center }
    @cell(4) { @place: .8em calc(100% - .8em) }
    @cell(5) { @place: 75% 80% }
  `,
});
