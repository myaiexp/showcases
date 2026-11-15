// Columns with @x and @X
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5x4 / 100% auto _1px / #000;
  background: #000;
  color: #fff;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@x, @X`), { frame: 'wide' });
  stage.variants(doodle, [
    { label: '@x, @X', code: code(`@x, @X`) },
    { label: '@x(-1)', code: code(`@x(-1)`) },
    { label: '@X(-@x, +1)', code: code(`@X(-@x, +1)`) },
    { label: '@col', code: code(`@col`) },
  ]);
  stage.say('@x counts columns from 1, @X is the column count');
  return () => stage.dispose();
};

export default mount;
