// Steps through: Theory: a text passage as an infographic
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Levels as ascending steps",
    syntax: `infographic sequence-ascending-steps
theme dark
data
  title Technical Levels
  sequences
    - label P5
      desc Executor
      icon seedling
    - label P6
      desc Contributor
      icon hammer
    - label P7
      desc Backbone
      icon sitemap
    - label P8
      desc Architect
      icon drafting-compass
    - label P9
      desc Expert
      icon graduation-cap
    - label P10
      desc Leader
      icon crown`,
  },
  {
    say: "Levels as a pyramid",
    syntax: `infographic list-pyramid-badge-card
theme dark
data
  title Technical Levels
  lists
    - label P5
      desc Executor
      icon seedling
    - label P6
      desc Contributor
      icon hammer
    - label P7
      desc Backbone
      icon sitemap
    - label P8
      desc Architect
      icon drafting-compass
    - label P9
      desc Expert
      icon graduation-cap
    - label P10
      desc Leader
      icon crown`,
  },
  {
    say: "Levels as 3D stairs",
    syntax: `infographic sequence-ascending-stairs-3d-underline-text
theme dark
data
  title Technical Levels
  sequences
    - label P5
      desc Executor
      icon seedling
    - label P6
      desc Contributor
      icon hammer
    - label P7
      desc Backbone
      icon sitemap
    - label P8
      desc Architect
      icon drafting-compass
    - label P9
      desc Expert
      icon graduation-cap
    - label P10
      desc Leader
      icon crown`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 460, hint: "Read the paragraph in the side panel, then the picture: the same six levels, readable in seconds." });
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const text = stage.side("Text");
  if (text) text.textContent = "At Alibaba, technical positions range from P5 to P10, each level with different responsibilities.\nP5 is an entry-level executor, learning under guidance;\nP6 is an independent contributor who delivers module-level work;\nP7 takes on system design and project advancement;\nP8 has architectural capability and leads large projects;\nP9 is a technical expert or manager of cross-team planning;\nP10 is an industry leader who sets benchmarks.";
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
