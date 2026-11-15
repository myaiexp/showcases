// drag: let the pointer turn and tilt the view
import { createStage } from '../../shared/stage.ts';
import type { Mount } from '@/types.ts';

const code = (spin: string): string => `
  @grid: 1 / 100%;
  @content: @scene(
    box { size: .7; round: .08; fill: #fc0 }
    torus { r: .55 .06; fill: #f06 }
    view: ${spin} 25;
    drag: turn tilt;
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the model to turn and tilt it' });
  stage.doodle(code(ctx.preview ? '40t' : '30'));
  stage.say('drag: turn tilt, and the camera keeps its distance');
  return () => stage.dispose();
};

export default mount;
