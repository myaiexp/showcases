// Column ratio: @xX
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #f5f5f0;
  background: #000;
  opacity: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@xX`));
  stage.variants(doodle, [
    { label: '@xX', code: code(`@xX`) },
    { label: '@Xx', code: code(`@Xx`) },
  ]);
  stage.say('Each column shares one ratio');
  return () => stage.dispose();
};

export default mount;
