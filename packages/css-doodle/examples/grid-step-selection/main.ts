// css-doodle example: direct attention with cell selectors, from the Start from a grid guide
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @grid: 7 / 100% / #333 _ 2px;
    background: @p(#ff5f57, #ff9f1c, #7657ff);
    border-radius: @p.cycle(100% 0 0 0);
    rotate: @p(0deg, 90deg, 180deg, 270deg);
    scale: @r(.82, 1);
    @cell(x = y, x + y = 8) {
      border-radius: 50%;
    }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  // Random picks: a new seed every few seconds in the card, a button in the full view.
  stage.reroll(doodle);
  stage.say('@cell(x = y, x + y = 8) picks both diagonals.');
  return () => stage.dispose();
};

export default mount;
