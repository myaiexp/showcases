// @i means @i(); a number stuck to the name is the first argument
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 8 / 100% / #111;
    background: hsl(@r(360) 70% 60%);
    opacity: $(.5 + @r(.5));
    rotate: @r(90)deg;
    border-radius: 0 50%;
`;
const v1 = `
    @grid: 8 / 100% / #111;
    background: hsl(@r360 70% 60%);
    opacity: $(.5 + @r.5);
    rotate: @r90deg;
    border-radius: 0 50%;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '@r(.5) and @r(360)', code: v0 },
    { label: '@r.5 and @r360', code: v1 },
  ], 2000);
  stage.say('@r360 is @r(360), @r.5 is @r(.5); but @r90deg reads as one name, so no rotation');
  return () => stage.dispose();
};

export default mount;
