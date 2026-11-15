// The step: @n, @N and operations
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #000;
  color: #fff;
  font-size: 1.2em;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@m5(@n)`));
  stage.variants(doodle, [
    { label: '@n', code: code(`@m5(@n)`) },
    { label: '@N', code: code(`@m5(@N)`) },
    { label: '@N(-@n, +1)', code: code(`@m5(@N(-@n, +1))`) },
    { label: '@n(*10%)', code: code(`@m5(@n(*10%))`) },
    { label: 'outside', code: code(`@n @N`) },
  ]);
  stage.say('@n steps up, @N(-@n, +1) steps down');
  return () => stage.dispose();
};

export default mount;
