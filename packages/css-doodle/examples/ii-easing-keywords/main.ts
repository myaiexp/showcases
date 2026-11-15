// Easing the index ratio
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1x12 / 100% _2px / #f5f5f0;
  @size: @iI(${v}, *100%) 8px;
  background: #000;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`linear`));
  stage.variants(doodle, [
    { label: 'linear', code: code(`linear`) },
    { label: 'ease', code: code(`ease`) },
    { label: 'ease-in', code: code(`ease-in`) },
    { label: 'ease-out', code: code(`ease-out`) },
    { label: 'ease-in-out', code: code(`ease-in-out`) },
    { label: 'cubic-bezier', code: code(`cubic-bezier(.7, -.4, .3, 1.4)`) },
  ]);
  stage.say('The easing is the first argument of @iI');
  return () => stage.dispose();
};

export default mount;
