// css-doodle example: @p.cycle(...) composes two functions; the rightmost runs first
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// @p.cycle(100% 0 0 0) is @p(@cycle(100% 0 0 0)): @cycle lists the four
// rotations of the corner radius, then @p picks one of them per cell.
const code = `
    @grid: 5 / 100% _2px;
    background: #000;
    border-radius: @p.cycle(100% 0 0 0);
    transition: .5s;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle);
  stage.say('@p.cycle(100% 0 0 0) = @p(@cycle(100% 0 0 0))');
  return () => stage.dispose();
};

export default mount;
