// The quick start page's first infographic, growing from 3 to 5 steps
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Three steps',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
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
    say: 'Four steps: one more list item',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Step 1
      desc Start
    - label Step 2
      desc In Progress
    - label Step 3
      desc Review
    - label Step 4
      desc Complete`,
  },
  {
    say: 'Five steps, new wording',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Test
      desc Break it
    - label Ship
      desc Release it
    - label Learn
      desc Repeat`,
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
