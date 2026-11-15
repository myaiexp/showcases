// Row ratio: @yY
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #f5f5f0;
  background: #000;
  opacity: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@yY`));
  stage.variants(doodle, [
    { label: '@yY', code: code(`@yY`) },
    { label: '@Yy', code: code(`@Yy`) },
  ]);
  stage.say('Each row shares one ratio');
  return () => stage.dispose();
};

export default mount;
