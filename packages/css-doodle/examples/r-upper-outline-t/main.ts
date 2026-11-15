// A noisy outline with @R.t
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 3 / 100% _2px / #f5f5f0;
  background: #000;
  clip-path: @shape(
    points: 200;
    r: @R.t(.6, 1, frequency=${v});
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`3`));
  stage.variants(doodle, [
    { label: 'frequency=3', code: code(`3`) },
    { label: 'frequency=1', code: code(`1`) },
    { label: 'frequency=6', code: code(`6`) },
  ]);
  stage.reroll(doodle);
  stage.say('Each cell reads a different circle of noise');
  return () => stage.dispose();
};

export default mount;
