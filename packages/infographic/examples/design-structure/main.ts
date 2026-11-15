// design.structure swaps the skeleton while data and item stay the same
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'structure list-grid, item compact-card',
    syntax: `infographic
design
  structure list-grid
  item compact-card
  title default
theme dark
data
  title Product Pillars
  desc Four things we protect
  lists
    - label Speed
      desc Fast by default
      icon bolt
    - label Safety
      desc Secure by design
      icon shield
    - label Clarity
      desc Plain and simple
      icon lightbulb
    - label Reach
      desc Works everywhere
      icon globe`,
  },
  {
    say: 'structure list-pyramid, item compact-card',
    syntax: `infographic
design
  structure list-pyramid
  item compact-card
  title default
theme dark
data
  title Product Pillars
  desc Four things we protect
  lists
    - label Speed
      desc Fast by default
      icon bolt
    - label Safety
      desc Secure by design
      icon shield
    - label Clarity
      desc Plain and simple
      icon lightbulb
    - label Reach
      desc Works everywhere
      icon globe`,
  },
  {
    say: 'structure list-column, item compact-card',
    syntax: `infographic
design
  structure list-column
  item compact-card
  title default
theme dark
data
  title Product Pillars
  desc Four things we protect
  lists
    - label Speed
      desc Fast by default
      icon bolt
    - label Safety
      desc Secure by design
      icon shield
    - label Clarity
      desc Plain and simple
      icon lightbulb
    - label Reach
      desc Works everywhere
      icon globe`,
  },
  {
    say: 'structure list-row, item compact-card',
    syntax: `infographic
design
  structure list-row
  item compact-card
  title default
theme dark
data
  title Product Pillars
  desc Four things we protect
  lists
    - label Speed
      desc Fast by default
      icon bolt
    - label Safety
      desc Secure by design
      icon shield
    - label Clarity
      desc Plain and simple
      icon lightbulb
    - label Reach
      desc Works everywhere
      icon globe`,
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
