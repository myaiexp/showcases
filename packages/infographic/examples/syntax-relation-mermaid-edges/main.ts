// relations written as A -> B lines, with nodes still defined in a nodes block
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'A -> B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id A
      label Node A
    - id B
      label Node B
    - id C
      label Node C
  relations
    A -> B`,
  },
  {
    say: 'A -> B and A <- C (an edge from C to A)',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id A
      label Node A
    - id B
      label Node B
    - id C
      label Node C
  relations
    A -> B
    A <- C`,
  },
  {
    say: 'A chain: A -> B -> C -> A',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id A
      label Node A
    - id B
      label Node B
    - id C
      label Node C
  relations
    A -> B -> C -> A`,
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
