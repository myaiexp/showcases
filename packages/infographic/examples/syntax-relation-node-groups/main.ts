// A group value on a node gives every node with that group the same colour
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Two groups: Client and Server',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id web
      label Web
      group Client
    - id app
      label App
      group Client
    - id api
      label API
      group Server
    - id db
      label DB
      group Server
  relations
    web -> api
    app -> api
    api -> db`,
  },
  {
    say: 'Four groups: every node gets its own colour',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id web
      label Web
      group Client
    - id app
      label App
      group Mobile
    - id api
      label API
      group Server
    - id db
      label DB
      group Storage
  relations
    web -> api
    app -> api
    api -> db`,
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
