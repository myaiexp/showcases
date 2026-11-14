// :container is the element between :doodle and the cells
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 3x1 / 100% / #181818 ß #888;
    @place: center;
    @size: @pn(80%, 55%, 35%);
    animation: p 1.6s ease-in-out infinite alternate;
    animation-delay: calc(@i * -.4s);
    @keyframes p {
      to { scale: .9 }
    }
    
    @cell(1, 2) {
      @grid: 1 / 100%;
      border: 1px solid #888;
      :after {
        content: @pn(':doodle', ':container');
        position: absolute;
        color: #fff;
        top: 0;
        left: .5em;
        transform: translateY(-50%);
        padding-inline: 5px;
        background: #181818;
      }
    }
    
    @cell(3) {
      background: @doodle(
        @grid: 4 / 100% _1px;
        background: #e6437d;
      );
    }
  `,
});
