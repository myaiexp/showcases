// :doodle::before and ::after, or nested with &, add text to the host
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    :doodle {
      @grid: 1 / 100%;
      position: relative;
      &::before {
        content: 'hello';
        position: absolute;
        inset: 25%;
        color: #e6437d;
        font-size: 2em;
        animation: f 1.5s infinite alternate;
      }
    }
    :doodle::after {
      content: 'world';
      position: absolute;
      inset: 65%;
      color: #fff;
      font-size: 2em;
      animation: f 1.5s -.75s infinite alternate;
    }
    @keyframes f {
      to { opacity: .1 }
    }
  `,
});
