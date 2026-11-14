// @media wraps rules in a doodle the way it does in CSS
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 5 / 100% _1px;
    background: #e6437d;
    
    @media (prefers-reduced-motion: no-preference) {
      animation: b 1.2s calc(@i * -.12s) infinite alternate;
      @keyframes b {
        to { scale: .5 }
      }
    }
    
    @media (hover: hover) {
      :hover {
        background: #fff;
      }
    }
    
    @media (prefers-color-scheme: light) {
      background: #333;
    }
  `,
});
