// ::after on a cell takes the cell functions, so each gets its own dot
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 5 / 100% _1px;
    background: #333;
    
    ::after {
      content: '';
      @size: @r(20%, 80%);
      background: @p(#fff, #e6437d, #ebbf4d);
      border-radius: 50%;
    }
  `,
  reroll: true,
});
