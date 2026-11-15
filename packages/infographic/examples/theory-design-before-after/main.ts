// Steps through: Design: crowded against clear
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Before: long labels, no icons, no padding",
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title The Team Handbook And Its Many Sections
  lists
    - label Our extremely comprehensive onboarding programme
      desc It is the case that new members will be taken through every single document we have ever written
    - label Fortnightly synchronisation meetings
      desc Meetings in which all the teams get together to talk about everything at once
    - label Retrospective assessment of outcomes
      desc A look back at whatever happened over the previous quarter`,
    padding: 0,
  },
  {
    say: "After: short labels, one idea each",
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Team Handbook
  lists
    - label Onboard
      desc Read the basics
    - label Sync
      desc Meet every two weeks
    - label Review
      desc Look back each quarter`,
    padding: 24,
  },
  {
    say: "After: semantic icons add meaning",
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Team Handbook
  lists
    - label Onboard
      desc Read the basics
      icon door-open
    - label Sync
      desc Meet every two weeks
      icon rotate
    - label Review
      desc Look back each quarter
      icon magnifying-glass-chart`,
    padding: 24,
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
