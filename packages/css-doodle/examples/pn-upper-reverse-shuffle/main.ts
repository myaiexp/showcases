// @PNR and @PD in a sequence
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  background: @m2x2.doodle(
    @grid: 1 / 100%;
    background: #000;
    @shape: @${v}(circle, triangle, hexagon, star);
  );
  background-repeat: no-repeat;
  background-size: 50% 50%;
  background-position: @m2x2(
    @nx(*100%, -100%) @ny(*100%, -100%)
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`PN`));
  stage.variants(doodle, [
    { label: '@PN', code: code(`PN`) },
    { label: '@PNR', code: code(`PNR`) },
    { label: '@PD', code: code(`PD`) },
  ]);
  stage.reroll(doodle);
  stage.say('@PN forward, @PNR backward, @PD shuffled');
  return () => stage.dispose();
};

export default mount;
