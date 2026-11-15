// A range as the count
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #000;
  color: #fff;
  font-size: 1.5em;
  @content: @m${v}(@n);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`5-1`));
  stage.variants(doodle, [
    { label: '5-1', code: code(`5-1`) },
    { label: '1-5', code: code(`1-5`) },
    { label: '3-5', code: code(`3-5`) },
    { label: '2-7', code: code(`2-7`) },
  ]);
  stage.say('The count 5-1 counts down');
  return () => stage.dispose();
};

export default mount;
