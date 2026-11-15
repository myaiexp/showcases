// Reusing a random value with @lr
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #f5f5f0;
  background: #000;
  @size: @r(30%, 90%) @${v};
  margin: auto;
  transition: .6s;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`lr`));
  stage.variants(doodle, [
    { label: '@lr', code: code(`lr`) },
    { label: 'no @lr', code: code(`r(30%, 90%)`) },
  ]);
  stage.reroll(doodle);
  stage.say('@lr repeats the last random number');
  return () => stage.dispose();
};

export default mount;
