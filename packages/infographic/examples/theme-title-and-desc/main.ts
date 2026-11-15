// theme.title and theme.desc style the infographic title and description text
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'No title or desc styles',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Quarterly Plan
  desc Three moves for the next quarter
  lists
    - label Hire
    - label Build
    - label Launch`,
  },
  {
    say: 'title: fill #ff6bb5, font-size 36',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  title
    fill #ff6bb5
    font-size 36
data
  title Quarterly Plan
  desc Three moves for the next quarter
  lists
    - label Hire
    - label Build
    - label Launch`,
  },
  {
    say: 'plus desc: fill #ffd166, font-size 16',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
  title
    fill #ff6bb5
    font-size 36
  desc
    fill #ffd166
    font-size 16
data
  title Quarterly Plan
  desc Three moves for the next quarter
  lists
    - label Hire
    - label Build
    - label Launch`,
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
