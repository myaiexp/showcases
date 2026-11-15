// Rows with @y and @Y
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
  const doodle = stage.doodle(code(`@y, @Y`), { frame: 'wide' });
  stage.variants(doodle, [
    { label: '@y, @Y', code: code(`@y, @Y`) },
    { label: '@y(-1)', code: code(`@y(-1)`) },
    { label: '@Y(-@y, +1)', code: code(`@Y(-@y, +1)`) },
    { label: '@row', code: code(`@row`) },
  ]);
  stage.say('@y counts rows from 1, @Y is the row count');
  return () => stage.dispose();
};

export default mount;
