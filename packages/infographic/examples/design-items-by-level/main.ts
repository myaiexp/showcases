// In a hierarchy, design.items lists one item design per level, root level first
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'items: circle-node, then pill-badge',
    syntax: `infographic
design
  structure compare-hierarchy-left-right
    decoration split-line
    surround false
    groupGap -20
  title default
  items
    - circle-node
    - pill-badge
theme dark
data
  title Two levels, two designs
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
    say: 'a tree: items capsule-item, then rounded-rect-node',
    syntax: `infographic
design
  structure hierarchy-tree
  title default
  items
    - capsule-item
    - rounded-rect-node
theme dark
data
  root
    label Company
    children
      - label Product
        children
          - label Web
          - label App
      - label Sales`,
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
