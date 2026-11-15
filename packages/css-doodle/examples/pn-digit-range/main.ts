// A range with @pn
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #000;
  background: #000;
  color: #fff;
  @content: @pn([${v}]);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`1-9`));
  stage.variants(doodle, [
    { label: '[1-9]', code: code(`1-9`) },
    { label: '[a-e]', code: code(`a-e`) },
    { label: '[0-3]', code: code(`0-3`) },
  ]);
  stage.say('A bracket range read in order');
  return () => stage.dispose();
};

export default mount;
