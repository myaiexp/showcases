// i { } nests as a descendant of each cell, around @raw content
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 3 / 100% _1px;
    @content: @raw(<i>@i</i>);
    background: #e6437d;
    
    i {
      color: #fff;
      font-style: normal;
      font-size: 2em;
      animation: b 1.2s calc(@i * -.15s) infinite alternate;
      @keyframes b {
        to { opacity: .1 }
      }
    }
  `,
});
