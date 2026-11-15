// root is the top node and children nests the levels below it
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'root with two children',
    syntax: `infographic hierarchy-tree-curved-line-rounded-rect-node
theme dark
data
  root
    label Company
    children
      - label Department A
      - label Department B`,
  },
  {
    say: 'a third department',
    syntax: `infographic hierarchy-tree-curved-line-rounded-rect-node
theme dark
data
  root
    label Company
    children
      - label Department A
      - label Department B
      - label Department C`,
  },
  {
    say: 'children inside a child: a second level',
    syntax: `infographic hierarchy-tree-curved-line-rounded-rect-node
theme dark
data
  root
    label Company
    children
      - label Department A
        children
          - label Team 1
          - label Team 2
      - label Department B
        children
          - label Team 3`,
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
