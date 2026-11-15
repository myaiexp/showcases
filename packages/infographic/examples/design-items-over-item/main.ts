// With both item and items in the design, the per-level items list takes priority
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'item plain-text only',
    syntax: `infographic
design
  structure compare-hierarchy-left-right
    decoration split-line
    surround false
    groupGap -20
  item plain-text
  title default
theme dark
data
  compares
    - label Plan A
      children
        - label Fast
        - label Cheap
    - label Plan B
      children
        - label Solid
        - label Roomy`,
  },
  {
    say: 'item plain-text plus items: the items list wins',
    syntax: `infographic
design
  structure compare-hierarchy-left-right
    decoration split-line
    surround false
    groupGap -20
  item plain-text
  title default
  items
    - circle-node
    - pill-badge
theme dark
data
  compares
    - label Plan A
      children
        - label Fast
        - label Cheap
    - label Plan B
      children
        - label Solid
        - label Roomy`,
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
