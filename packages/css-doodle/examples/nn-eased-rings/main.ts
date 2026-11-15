// Easing the step ratio
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  @content: @svg(
    viewBox: -5 -5 10 10;
    circle*15 {
      r: @nN(${v}, *4.5);
      fill: none;
      stroke: #000;
      stroke-width: .1;
    }
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`ease-out`));
  stage.variants(doodle, [
    { label: 'ease-out', code: code(`ease-out`) },
    { label: 'ease-in', code: code(`ease-in`) },
    { label: 'linear', code: code(`linear`) },
  ]);
  stage.say('ease-out crowds the rings towards the edge');
  return () => stage.dispose();
};

export default mount;
