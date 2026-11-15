// Noise octaves
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 30 / 100% / #f5f5f0;
  background: #000;
  opacity: @R(0, 1, frequency=2, octave=${v});
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`1`));
  stage.variants(doodle, [
    { label: 'octave=1', code: code(`1`) },
    { label: 'octave=2', code: code(`2`) },
    { label: 'octave=4', code: code(`4`) },
    { label: 'octave=8', code: code(`8`) },
  ]);
  stage.reroll(doodle);
  stage.say('More octaves add finer detail');
  return () => stage.dispose();
};

export default mount;
