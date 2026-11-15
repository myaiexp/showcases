// Each cell's background is a whole 4 × 4 doodle, rendered to an image
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @grid: 3 / 100% / #f5f5f0 _2px;
    background: @doodle(
      @grid: 4 / 100%;
      background: @p(#000, #e6437d, #ebbf4d);
      margin: 1px;
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle);
  stage.say('Nine cells, nine nested doodles, each with its own picks');
  return () => stage.dispose();
};

export default mount;
