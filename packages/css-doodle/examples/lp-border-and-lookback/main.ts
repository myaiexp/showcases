// @lp(n) looks further back
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 6 / 100% _2px / #f5f5f0;
  border: 2px solid @p(#000, #e6437d, #ebbf4d);
  background: @${v};
  border-radius: @p(0, 50%);
  @cell(random) {
    background: #fff;
  }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`lp`));
  stage.variants(doodle, [
    { label: '@lp', code: code(`lp`) },
    { label: '@lp(2)', code: code(`lp(2)`) },
  ]);
  stage.reroll(doodle);
  stage.say('@lp is the last pick, @lp(2) the one before');
  return () => stage.dispose();
};

export default mount;
