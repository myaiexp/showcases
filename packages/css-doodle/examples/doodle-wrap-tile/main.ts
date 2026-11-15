// @doodle100.wrap(...): a tile whose edges wrap around, repeated with no seams
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @grid: 1 / 100% / #f5f5f0;
    background: @doodle100.wrap(
      @grid: 4 / 100%;
      @place: @r(100%) @r(100%);
      @size: @r(10%, 40%);
      border: 2px solid #000;
      border-radius: 50%;
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle, 2600);
  stage.say('Circles cut by an edge reappear on the opposite side');
  return () => stage.dispose();
};

export default mount;
