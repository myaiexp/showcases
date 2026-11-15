// Row ratio widths with easing
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1x12 / 100% _1px / #f5f5f0;
  background: #000;
  width: @Yy(${v}, *100%);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`ease-in-out`));
  stage.variants(doodle, [
    { label: 'ease-in-out', code: code(`ease-in-out`) },
    { label: 'ease', code: code(`ease`) },
    { label: 'ease-in', code: code(`ease-in`) },
    { label: 'linear', code: code(`linear`) },
  ]);
  stage.say('The easing curve shapes the stack');
  return () => stage.dispose();
};

export default mount;
