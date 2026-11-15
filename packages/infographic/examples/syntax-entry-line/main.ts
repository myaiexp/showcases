// The first line, infographic <template-name>, picks the template for the data below
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'infographic list-row-horizontal-icon-arrow',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Customer Growth
  lists
    - label Acquire
      desc Reach new leads
      icon rocket
    - label Convert
      desc Follow up fast
      icon chart-line
    - label Retain
      desc Reward loyalty
      icon users`,
  },
  {
    say: 'infographic list-grid-compact-card',
    syntax: `infographic list-grid-compact-card
theme dark
data
  title Customer Growth
  lists
    - label Acquire
      desc Reach new leads
      icon rocket
    - label Convert
      desc Follow up fast
      icon chart-line
    - label Retain
      desc Reward loyalty
      icon users`,
  },
  {
    say: 'infographic list-column-vertical-icon-arrow',
    syntax: `infographic list-column-vertical-icon-arrow
theme dark
data
  title Customer Growth
  lists
    - label Acquire
      desc Reach new leads
      icon rocket
    - label Convert
      desc Follow up fast
      icon chart-line
    - label Retain
      desc Reward loyalty
      icon users`,
  },
  {
    say: 'infographic list-waterfall-compact-card',
    syntax: `infographic list-waterfall-compact-card
theme dark
data
  title Customer Growth
  lists
    - label Acquire
      desc Reach new leads
      icon rocket
    - label Convert
      desc Follow up fast
      icon chart-line
    - label Retain
      desc Reward loyalty
      icon users`,
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
