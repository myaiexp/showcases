// Weighted picks with x3
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 6 / 100% _1px / #f5f5f0;
  background: @p(#000 x${v}, #e6437d, #ebbf4d);
  transition: .5s;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`3`));
  stage.variants(doodle, [
    { label: 'x3', code: code(`3`) },
    { label: 'x1', code: code(`1`) },
    { label: 'x8', code: code(`8`) },
  ]);
  stage.reroll(doodle);
  stage.say('More copies in the list, more often picked');
  return () => stage.dispose();
};

export default mount;
