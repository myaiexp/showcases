// Filling steps with ...
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #000;
  background: #000;
  color: #fff;
  @content: @p(${v});
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`1, 3, ..., 11`));
  stage.variants(doodle, [
    { label: '1, 3, ..., 11', code: code(`1, 3, ..., 11`) },
    { label: 'a, c, ..., i', code: code(`a, c, ..., i`) },
    { label: '0, 10, ..., 50', code: code(`0, 10, ..., 50`) },
  ]);
  stage.reroll(doodle);
  stage.say('The gap between the two values is the step');
  return () => stage.dispose();
};

export default mount;
