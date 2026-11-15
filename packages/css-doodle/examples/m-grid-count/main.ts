// A grid as the count
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #000;
  color: #fff;
  font-size: 1.2em;
  @content: @M${v}(@nx,@ny);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`2x3`));
  stage.variants(doodle, [
    { label: '2x3', code: code(`2x3`) },
    { label: '3x3', code: code(`3x3`) },
    { label: '4x2', code: code(`4x2`) },
  ]);
  stage.say('@nx is the column and @ny the row of each step');
  return () => stage.dispose();
};

export default mount;
