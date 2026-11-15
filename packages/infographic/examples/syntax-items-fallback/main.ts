// When unsure which field a template wants, the generic items field adapts
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'items under a list template',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Summary
  items
    - label Efficiency first
      desc Focus on key actions
      icon bolt
    - label Result driven
      desc Ship actionable output
      icon bullseye`,
  },
  {
    say: 'the same items under a sequence template',
    syntax: `infographic sequence-timeline-simple
theme dark
data
  title Summary
  items
    - label Efficiency first
      desc Focus on key actions
      icon bolt
    - label Result driven
      desc Ship actionable output
      icon bullseye`,
  },
  {
    say: 'items with a value, under a bar chart',
    syntax: `infographic chart-bar-plain-text
theme dark
data
  title Summary
  items
    - label Efficiency first
      value 72
    - label Result driven
      value 58`,
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
