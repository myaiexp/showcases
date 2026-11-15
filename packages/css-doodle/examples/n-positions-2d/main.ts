// Positions from a 2D sequence
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  background:
    ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@m4x4(
    radial-gradient(#000 50%, #0000 0)
    @nx(*25%, -12.5%) @ny(*25%, -12.5%)
    / 20% 20% no-repeat
  )`));
  stage.variants(doodle, [
    { label: '4x4', code: code(`@m4x4(
    radial-gradient(#000 50%, #0000 0)
    @nx(*25%, -12.5%) @ny(*25%, -12.5%)
    / 20% 20% no-repeat
  )`) },
    { label: '5x5', code: code(`@m5x5(
    radial-gradient(#000 50%, #0000 0)
    @nx(*20%, -10%) @ny(*20%, -10%)
    / 16% 16% no-repeat
  )`) },
    { label: '8x2', code: code(`@m8x2(
    radial-gradient(#000 50%, #0000 0)
    @nx(*12.5%, -6.25%) @ny(*50%, -25%)
    / 10% 30% no-repeat
  )`) },
  ]);
  stage.say('One layer per step, placed by @nx and @ny');
  return () => stage.dispose();
};

export default mount;
