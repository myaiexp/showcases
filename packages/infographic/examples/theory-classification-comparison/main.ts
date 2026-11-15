// Steps through: Classification: the Comparison structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Binary comparison: old against new",
    syntax: `infographic compare-binary-horizontal-simple-vs
theme dark
data
  title Comparison
  compares
    - label Old plan
      children
        - label Slow
        - label Costly
    - label New plan
      children
        - label Quick
        - label Cheap`,
  },
  {
    say: "Mirror layout: A against B",
    syntax: `infographic compare-hierarchy-left-right-circle-node-plain-text
theme dark
data
  title Comparison
  compares
    - label Plan A
      children
        - label Simple
        - label Stable
    - label Plan B
      children
        - label Flexible
        - label Complex`,
  },
  {
    say: "Matrix comparison: four quadrants",
    syntax: `infographic compare-quadrant-quarter-simple-card
theme dark
data
  title Comparison
  compares
    - label Do now
      desc Urgent, important
      icon bolt
    - label Plan
      desc Important only
      icon calendar
    - label Delegate
      desc Urgent only
      icon share-nodes
    - label Drop
      desc Neither
      icon trash`,
  },
  {
    say: "Multi-element comparison: SWOT",
    syntax: `infographic compare-swot
theme dark
data
  title Comparison
  compares
    - label Strengths
      children
        - label Loyal users
    - label Weaknesses
      children
        - label Small team
    - label Opportunities
      children
        - label New markets
    - label Threats
      children
        - label New rivals`,
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
