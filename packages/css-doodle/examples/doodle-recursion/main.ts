// A doodle in a doodle in a doodle, ending in an @svg triangle
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @grid: @p(2, 3) / 100% / #f5f5f0;
    background: @doodle(
      @grid: @r4 / 100%;
      background: @doodle(
        @grid: @r4 / 100%;
        background: @svg(
          viewBox: 0 0 1 1;
          path {
            d: M 0 0 L 1 0 L 1 1;
            fill: #000;
          }
        );
      );
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle, 2600);
  stage.say('@grid: @p(2, 3) outside, @r4 at each level inside');
  return () => stage.dispose();
};

export default mount;
