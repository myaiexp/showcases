// Steps through: Classification: the Sequential structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Linear: operation steps",
    syntax: `infographic sequence-steps-simple
theme dark
data
  title Sequential
  sequences
    - label Sign up
      desc Email
      icon envelope
    - label Verify
      desc Code
      icon shield-halved
    - label Profile
      desc Name
      icon user
    - label Start
      desc Go
      icon flag-checkered`,
  },
  {
    say: "Temporal: project milestones",
    syntax: `infographic sequence-timeline-simple
theme dark
data
  title Sequential
  sequences
    - label Kickoff
      desc Jan
      icon flag
    - label Alpha
      desc Mar
      icon flask
    - label Beta
      desc Jun
      icon vial
    - label Launch
      desc Sep
      icon rocket`,
  },
  {
    say: "Circular: a closed loop",
    syntax: `infographic sequence-circular-simple
theme dark
data
  title Sequential
  sequences
    - label Plant
      desc Spring
      icon seedling
    - label Grow
      desc Summer
      icon sun
    - label Harvest
      desc Autumn
      icon wheat-awn
    - label Rest
      desc Winter
      icon snowflake`,
  },
  {
    say: "Causal: visits to buyers",
    syntax: `infographic sequence-funnel-simple
theme dark
data
  title Sequential
  sequences
    - label Visit
      desc All
      icon eye
    - label Browse
      desc Half
      icon bars
    - label Cart
      desc Few
      icon cart-shopping
    - label Buy
      desc Some
      icon credit-card`,
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
