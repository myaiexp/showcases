// @pnr with ... and x2
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 4x2 / 100% auto _1px / #000;
  background: #000;
  color: #fff;
  font-size: 1.4em;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@pnr(1, 2, ...)`), { frame: 'wide' });
  stage.variants(doodle, [
    { label: '@pnr(1, 2, ...)', code: code(`@pnr(1, 2, ...)`) },
    { label: '@pn(1, 2, ...)', code: code(`@pn(1, 2, ...)`) },
    { label: '@pn(a x2, b)', code: code(`@pn(a x2, b)`) },
    { label: '@pn(0, 90, ...)', code: code(`@pn(0, 90, ...)`) },
  ]);
  stage.say('... and x2 both work in the ordered picks');
  return () => stage.dispose();
};

export default mount;
