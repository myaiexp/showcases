// Noise frequency
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 20 / 100% / #f5f5f0;
  background: #000;
  scale: @R(0, 1, ${v});
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`1`));
  stage.variants(doodle, [
    { label: '1', code: code(`1`) },
    { label: '3', code: code(`3`) },
    { label: '6', code: code(`6`) },
    { label: 'frequency=3', code: code(`frequency=3`) },
  ]);
  stage.reroll(doodle);
  stage.say('A higher frequency gives smaller patches');
  return () => stage.dispose();
};

export default mount;
