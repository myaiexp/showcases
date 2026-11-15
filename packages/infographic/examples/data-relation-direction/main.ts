// nodes with ids and a relation from api to db whose direction is forward, both or none
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'direction forward',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  title System Relations
  nodes
    - id api
      label API
    - id db
      label DB
  relations
    - from api
      to db
      direction forward`,
  },
  {
    say: 'direction both',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  title System Relations
  nodes
    - id api
      label API
    - id db
      label DB
  relations
    - from api
      to db
      direction both`,
  },
  {
    say: 'direction none',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  title System Relations
  nodes
    - id api
      label API
    - id db
      label DB
  relations
    - from api
      to db
      direction none`,
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
