// nodes lists the nodes, relations lists from/to pairs; an id is optional
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Node A (id defaults to its label) to node B (id B)',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  title Relation Graph
  nodes
    - label Node A
    - id B
      label Node B
  relations
    - from Node A
      to B`,
  },
  {
    say: 'A third node and a second relation',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  title Relation Graph
  nodes
    - label Node A
    - id B
      label Node B
    - id C
      label Node C
  relations
    - from Node A
      to B
    - from B
      to C`,
  },
  {
    say: 'Relation labels with label',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  title Relation Graph
  nodes
    - label Node A
    - id B
      label Node B
    - id C
      label Node C
  relations
    - from Node A
      to B
    - from B
      to C
      label feeds
    - from C
      to Node A
      label loops back`,
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
