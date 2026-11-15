// @doodle vs @doodle40: digits after the name set the image's pixel size
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 2 / 100% / #222 _4px;
    background: @doodle(
      @grid: 5 / 100%;
      background: @p(#e6437d, #ebbf4d, #f5f5f0);
      border-radius: 50%;
    );
`;
const v1 = `
    @grid: 2 / 100% / #222 _4px;
    background: @doodle40(
      @grid: 5 / 100%;
      background: @p(#e6437d, #ebbf4d, #f5f5f0);
      border-radius: 50%;
    ) 0 0 / 40px 40px;
`;
const v2 = `
    @grid: 2 / 100% / #222 _4px;
    background: @doodle200x100(
      @grid: 10x5 / 100%;
      background: @p(#e6437d, #ebbf4d, #f5f5f0);
      border-radius: 50%;
    ) center / contain no-repeat;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '@doodle (cover)', code: v0 },
    { label: '@doodle40 + size 40px', code: v1 },
    { label: '@doodle200x100', code: v2 },
  ]);
  stage.say('A plain @doodle() covers the cell; a sized one can repeat');
  return () => stage.dispose();
};

export default mount;
