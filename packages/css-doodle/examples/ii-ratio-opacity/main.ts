// Index as a ratio: @iI
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #f5f5f0;
  background: #000;
  opacity: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@iI`));
  stage.variants(doodle, [
    { label: '@iI', code: code(`@iI`) },
    { label: '@Ii', code: code(`@Ii`) },
  ]);
  stage.say('The last cell is 1; the first is 1 / @I');
  return () => stage.dispose();
};

export default mount;
