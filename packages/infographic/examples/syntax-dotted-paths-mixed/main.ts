// A dotted key beside an indented block, and a path assigned twice keeps the last value
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'A block for base.shape plus a dotted base.text.fill line',
    syntax: `infographic list-grid-compact-card
theme dark
  base
    shape
      stroke #ff9f1c
  base.text.fill #8ecae6
data
  lists
    - label Block
      icon cube
    - label Dotted
      icon ellipsis
    - label Mixed
      icon blender`,
  },
  {
    say: 'fill assigned twice: yellow, then pink wins',
    syntax: `infographic list-grid-compact-card
theme dark
  base.text.fill #ffd166
  base.text.fill #ff6bb5
data
  lists
    - label First
      icon one
    - label Second
      icon two
    - label Last wins
      icon trophy`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
    }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
