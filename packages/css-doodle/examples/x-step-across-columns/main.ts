// A step across the columns
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 10x4 / 100% auto _1px / #f5f5f0;
  background: #000;
  opacity: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@x(/10)`), { frame: 'wide' });
  stage.variants(doodle, [
    { label: '@x(/10)', code: code(`@x(/10)`) },
    { label: '@x(/5)', code: code(`@x(/5)`) },
    { label: '@X(-@x, +1)', code: code(`@X(-@x, +1, /10)`) },
  ]);
  stage.say('Opacity follows the column number');
  return () => stage.dispose();
};

export default mount;
