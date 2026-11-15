// palette as a list of colours, written as dashed lines or inline
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Three colours, one per item',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  palette
    - #61DDAA
    - #F6BD16
    - #F08BB4
data
  lists
    - label Step 1
      desc Start
    - label Step 2
      desc In Progress
    - label Step 3
      desc Complete`,
  },
  {
    say: 'Two colours inline: the third item reuses the first',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  palette #ff5a5f #1fb6ff
data
  lists
    - label Step 1
      desc Start
    - label Step 2
      desc In Progress
    - label Step 3
      desc Complete`,
  },
  {
    say: 'Five colours: only the first three are used',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  palette #f43f5e #f59e0b #10b981 #3b82f6 #8b5cf6
data
  lists
    - label Step 1
      desc Start
    - label Step 2
      desc In Progress
    - label Step 3
      desc Complete`,
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
