// Steps through: Classification: the Statistical structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Statistical: chart-column-simple",
    syntax: `infographic chart-column-simple
theme dark
data
  title Quarterly Sales
  values
    - label Q1
      value 42
    - label Q2
      value 58
    - label Q3
      value 35
    - label Q4
      value 71`,
  },
  {
    say: "Statistical: chart-bar-plain-text",
    syntax: `infographic chart-bar-plain-text
theme dark
data
  title Quarterly Sales
  values
    - label Q1
      value 42
    - label Q2
      value 58
    - label Q3
      value 35
    - label Q4
      value 71`,
  },
  {
    say: "Statistical: chart-line-plain-text",
    syntax: `infographic chart-line-plain-text
theme dark
data
  title Quarterly Sales
  values
    - label Q1
      value 42
    - label Q2
      value 58
    - label Q3
      value 35
    - label Q4
      value 71`,
  },
  {
    say: "Statistical: chart-pie-plain-text",
    syntax: `infographic chart-pie-plain-text
theme dark
data
  title Quarterly Sales
  values
    - label Q1
      value 42
    - label Q2
      value 58
    - label Q3
      value 35
    - label Q4
      value 71`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 460, hint: "The cycle steps through the states; pause it to read the syntax on the right." });
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (step.padding !== undefined) infographic.update({ padding: ctx.preview ? Math.min(step.padding, 8) : step.padding });
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
