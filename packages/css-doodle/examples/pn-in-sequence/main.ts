// @pn inside @m
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  background: linear-gradient(
    45deg,
    ${v}
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@m4(@pn(#000, #e6437d, #ebbf4d, #fff) 0 @n(*25%))`));
  stage.variants(doodle, [
    { label: '@m4', code: code(`@m4(@pn(#000, #e6437d, #ebbf4d, #fff) 0 @n(*25%))`) },
    { label: '@m8', code: code(`@m8(@pn(#000, #e6437d, #ebbf4d, #fff) 0 @n(*12.5%))`) },
  ]);
  stage.say('One value per step of the sequence');
  return () => stage.dispose();
};

export default mount;
