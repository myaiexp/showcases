// Characters in brackets
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #000;
  background: #000;
  color: #fff;
  @content: @p([${v}]);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`A-Z`));
  stage.variants(doodle, [
    { label: '[A-Z]', code: code(`A-Z`) },
    { label: '[0-9a-f]', code: code(`0-9a-f`) },
    { label: '[A-Z0-9]', code: code(`A-Z0-9`) },
  ]);
  stage.reroll(doodle);
  stage.say('A bracket range is a list of characters');
  return () => stage.dispose();
};

export default mount;
