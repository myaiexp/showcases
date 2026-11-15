// Picking by index
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 7 / 100% _1px / #f5f5f0;
  background: @p(${v}: #000, #e6437d, #ebbf4d);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`x + y`));
  stage.variants(doodle, [
    { label: 'x + y', code: code(`x + y`) },
    { label: 'x', code: code(`x`) },
    { label: 'i', code: code(`i`) },
    { label: 'x * y', code: code(`x * y`) },
  ]);
  stage.say('The index decides the pick, not the seed');
  return () => stage.dispose();
};

export default mount;
