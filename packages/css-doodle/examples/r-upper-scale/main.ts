// Noise scale and named arguments
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 6 / 100% _1px / #000;
  color: #fff;
  font-size: .7em;
  @content: @ri(@R(100, 200, ${v}));
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`1, 1`));
  stage.variants(doodle, [
    { label: '(1, 1)', code: code(`1, 1`) },
    { label: 'scale 2', code: code(`1, 2`) },
    { label: 'named', code: code(`scale=2, frequency=1`) },
  ]);
  stage.reroll(doodle);
  stage.say('scale=2 doubles both bounds');
  return () => stage.dispose();
};

export default mount;
