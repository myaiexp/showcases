// Indexing a function’s list
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 7 / 100% _1px / #f5f5f0;
  background: @p(x + y: @palette(${v}));
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`4`));
  stage.variants(doodle, [
    { label: '@palette(4)', code: code(`4`) },
    { label: '@palette(6)', code: code(`6`) },
  ]);
  stage.say('x + y indexes into the palette');
  return () => stage.dispose();
};

export default mount;
