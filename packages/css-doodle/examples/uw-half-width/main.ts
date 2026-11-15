// Sizes from the doodle: @uw as a length
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { breathe } from '../../shared/b-pointer.ts';
const code = (v: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  background: #000;
  @size: ${v};
  margin: auto;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`$px(@uw / 2) $px(@uh / 4)`));
  stage.variants(doodle, [
    { label: '$px()', code: code(`$px(@uw / 2) $px(@uh / 4)`) },
    { label: '@uw(/2, *1px)', code: code(`@uw(/2, *1px) @uh(/4, *1px)`) },
  ]);
  breathe(stage, doodle);
  stage.say('The box is half the doodle wide and a quarter high');
  return () => stage.dispose();
};

export default mount;
