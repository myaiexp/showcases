// root as the entry node, nested through children, drawn as a mind map
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'root with two children',
    syntax: `infographic hierarchy-mindmap-branch-gradient-capsule-item
theme dark
data
  title Infographic Title
  root
    label Level 1 Item 1
    children
      - label Level 2 Item 1-1
      - label Level 2 Item 1-2`,
  },
  {
    say: 'children of a child',
    syntax: `infographic hierarchy-mindmap-branch-gradient-capsule-item
theme dark
data
  title Infographic Title
  root
    label Level 1 Item 1
    children
      - label Level 2 Item 1-1
        children
          - label Level 3 Item 1-1-1
          - label Level 3 Item 1-1-2
      - label Level 2 Item 1-2`,
  },
  {
    say: 'a third child under the root',
    syntax: `infographic hierarchy-mindmap-branch-gradient-capsule-item
theme dark
data
  title Infographic Title
  root
    label Level 1 Item 1
    children
      - label Level 2 Item 1-1
        children
          - label Level 3 Item 1-1-1
          - label Level 3 Item 1-1-2
      - label Level 2 Item 1-2
      - label Level 2 Item 1-3`,
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
