// Each step draws one row of the docs edge table: ->, <-, --, <->, labels
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'A -> B: from A to B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A -> B`,
  },
  {
    say: 'A <- B: from B to A',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A <- B`,
  },
  {
    say: 'A -- B: undirected edge (direction none)',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A -- B`,
  },
  {
    say: 'A<->B: bidirectional edge (direction both)',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A<->B`,
  },
  {
    say: 'A -relation label-> B: edge label',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A -relation label-> B`,
  },
  {
    say: 'A -->|relation label| B: label that may hold special characters',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A -->|relation label| B`,
  },
  {
    say: 'A --> B[label]: node label',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A --> B[label]`,
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
