// sequences as lanes, children as nodes with a step number, relations linking node ids
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'infographic sequence-interaction-default-compact-card',
    syntax: `infographic sequence-interaction-default-compact-card
theme dark
data
  title Login check
  sequences
    - label User
      icon user
      children
        - label Log in
          id user-login
          step 0
          icon login
        - label See result
          id user-result
          step 2
          icon inbox
    - label Server
      icon server
      children
        - label Verify
          id server-verify
          step 1
          icon shield
        - label Reply
          id server-return
          step 2
          icon send
  relations
    user-login - send credentials -> server-verify
    server-verify - build result -> server-return
    server-return - answer -> user-result`,
  },
  {
    say: 'infographic sequence-interaction-default-badge-card',
    syntax: `infographic sequence-interaction-default-badge-card
theme dark
data
  title Login check
  sequences
    - label User
      icon user
      children
        - label Log in
          id user-login
          step 0
          icon login
        - label See result
          id user-result
          step 2
          icon inbox
    - label Server
      icon server
      children
        - label Verify
          id server-verify
          step 1
          icon shield
        - label Reply
          id server-return
          step 2
          icon send
  relations
    user-login - send credentials -> server-verify
    server-verify - build result -> server-return
    server-return - answer -> user-result`,
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
