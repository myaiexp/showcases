// Picking in order with @pn
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: ${v} / 100% _1px / #f5f5f0;
  background: @pn(#000, #e6437d, #ebbf4d, #fff);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`5`));
  stage.variants(doodle, [
    { label: '5 × 5', code: code(`5`) },
    { label: '4 × 4', code: code(`4`) },
    { label: '6 × 6', code: code(`6`) },
    { label: '3 × 3', code: code(`3`) },
  ]);
  stage.say('The next value for each cell, wrapping at the end');
  return () => stage.dispose();
};

export default mount;
