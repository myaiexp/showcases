// Re-picking with @p()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #f5f5f0;
  background: @p(#000, #e6437d, #ebbf4d);
  border: 4px solid @${v}();
  transition: .5s;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`p`));
  stage.variants(doodle, [
    { label: '@p()', code: code(`p`) },
    { label: '@P()', code: code(`P`) },
  ]);
  stage.reroll(doodle);
  stage.say('@p() draws again from the earlier list');
  return () => stage.dispose();
};

export default mount;
