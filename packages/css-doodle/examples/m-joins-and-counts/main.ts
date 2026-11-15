// How @m, @M and @rep join
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #000;
  color: #fff;
  font-size: 1.1em;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@m3(@n)`));
  stage.variants(doodle, [
    { label: '@m3(@n)', code: code(`@m3(@n)`) },
    { label: '@M3(@n)', code: code(`@M3(@n)`) },
    { label: '@rep3(@n)', code: code(`@rep3(@n)`) },
    { label: '@m2(a, b)', code: code(`@m2(a, b)`) },
    { label: '@m2.5(@n)', code: code(`@m2.5(@n)`) },
    { label: '@m(4, @n)', code: code(`@m(4, @n)`) },
    { label: '@m0(@n)', code: code(`[@m0(@n)]`) },
  ]);
  stage.say('Same count, three joiners');
  return () => stage.dispose();
};

export default mount;
