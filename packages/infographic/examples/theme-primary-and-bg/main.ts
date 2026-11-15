// The primary colour, used for decoration and as the default item colour, and the background
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Default theme: primary #FF356A, white background',
    syntax: `infographic list-row-simple-horizontal-arrow

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
    say: 'colorPrimary #61DDAA, colorBg #1F1F1F',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  colorPrimary #61DDAA
  colorBg #1F1F1F
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
    say: 'Only colorPrimary #F6BD16 on the dark theme',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  colorPrimary #F6BD16
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
    say: 'colorPrimary #7C3AED on colorBg #F5F3FF',
    syntax: `infographic list-row-simple-horizontal-arrow
theme
  colorPrimary #7C3AED
  colorBg #F5F3FF
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
