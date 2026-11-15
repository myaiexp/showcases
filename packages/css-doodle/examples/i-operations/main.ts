// Operations on @i
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 4 / 100% _1px / #000;
  background: #000;
  color: #fff;
  font-size: .75em;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@i(-1)`));
  stage.variants(doodle, [
    { label: '@i(-1)', code: code(`@i(-1)`) },
    { label: '@i(%2)', code: code(`@i(%2)`) },
    { label: '@i(2/)', code: code(`@i(2/)`) },
    { label: '@i(*2, +10)', code: code(`@i(*2, +10)`) },
    { label: '@i5', code: code(`@i5`) },
    { label: '@i(*10px)', code: code(`@i(*10px)`) },
    { label: '@I(-@i, +1)', code: code(`@I(-@i, +1)`) },
  ]);
  stage.say('Operations apply left to right; 2/ divides 2 by the index');
  return () => stage.dispose();
};

export default mount;
