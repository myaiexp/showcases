// Steps through: Theory: L.A.T.C.H organisation
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Alphabet: an index in A to Z order",
    syntax: `infographic list-column-done-list
theme dark
data
  lists
    - label Apple
      desc Fruit
      icon apple-whole
    - label Bread
      desc Bakery
      icon bread-slice
    - label Cheese
      desc Dairy
      icon cheese
    - label Dates
      desc Fruit
      icon leaf`,
  },
  {
    say: "Time: events in date order",
    syntax: `infographic sequence-timeline-simple
theme dark
data
  sequences
    - label Founded
      desc 2012
      icon flag
    - label First app
      desc 2015
      icon mobile
    - label Series A
      desc 2019
      icon coins
    - label Global
      desc 2024
      icon globe`,
  },
  {
    say: "Category: products by type",
    syntax: `infographic compare-binary-horizontal-simple-vs
theme dark
data
  compares
    - label Hardware
      children
        - label Phone
        - label Watch
    - label Software
      children
        - label Mail
        - label Maps`,
  },
  {
    say: "Hierarchy: rank by importance",
    syntax: `infographic list-pyramid-badge-card
theme dark
data
  lists
    - label Vision
      desc Why
      icon eye
    - label Strategy
      desc How
      icon chess
    - label Tactics
      desc What
      icon list-check
    - label Tasks
      desc Today
      icon square-check`,
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
