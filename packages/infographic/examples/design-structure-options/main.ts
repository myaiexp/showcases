// Options under a structure line (columns, gap, zigzag) belong to that structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'default options',
    syntax: `infographic
design
  structure list-grid
  item horizontal-icon-arrow
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
    say: 'columns 2',
    syntax: `infographic
design
  structure list-grid
    columns 2
  item horizontal-icon-arrow
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
    say: 'columns 4, gap 10',
    syntax: `infographic
design
  structure list-grid
    columns 4
    gap 10
  item horizontal-icon-arrow
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
    say: 'columns 2, gap 0, zigzag true',
    syntax: `infographic
design
  structure list-grid
    columns 2
    gap 0
    zigzag true
  item horizontal-icon-arrow
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
