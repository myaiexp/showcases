// The three kinds of statement: declarations, selector blocks, conditional blocks
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// :doodle { } and :hover { } are selector blocks, background and transition are
// declarations, and @cell(random .3) is a conditional block.
const code = `
    :doodle {
      @grid: 6 / 100% _1px;
    }
    background: #eee;
    transition: .2s;
    @cell(random .3) {
      background: #000;
    }
    :hover {
      background: #e6437d;
      scale: 1.2;
      z-index: 40;
    }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Point at the cells: :hover scales and recolours them.' });
  const doodle = stage.doodle(code);
  stage.reroll(doodle);
  stage.say('@cell(random .3) paints about three cells in ten black');
  return () => stage.dispose();
};

export default mount;
