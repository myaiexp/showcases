// Distance rings: @dr, @dc and @dm
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 15 / 100% _1px / #f5f5f0;
  background: #000;
  opacity: @${v}(/14);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`dm`));
  stage.variants(doodle, [
    { label: '@dm diamonds', code: code(`dm`) },
    { label: '@dc squares', code: code(`dc`) },
    { label: '@dr circles', code: code(`dr`) },
  ]);
  stage.say('The same grid, three ways of measuring distance');
  return () => stage.dispose();
};

export default mount;
