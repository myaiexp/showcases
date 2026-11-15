// Steps around the middle: @nd
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #000;
  color: #fff;
  font-size: 1.5em;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@m5(@nd)`));
  stage.variants(doodle, [
    { label: '@m5(@nd)', code: code(`@m5(@nd)`) },
    { label: '@m5(@nd(1))', code: code(`@m5(@nd(1))`) },
    { label: '@m4(@nd)', code: code(`@m4(@nd)`) },
    { label: '@m5(@nd(-.5))', code: code(`@m5(@nd(-.5))`) },
  ]);
  stage.say('@nd is symmetric around 0');
  return () => stage.dispose();
};

export default mount;
