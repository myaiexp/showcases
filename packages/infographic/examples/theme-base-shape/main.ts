// theme.base.shape styles the shape graphics of structures and items
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'No base.shape',
    syntax: `infographic list-grid-compact-card
theme dark
data
  lists
    - label Mail
      icon envelope
    - label Chat
      icon comment
    - label Call
      icon phone
    - label Post
      icon paper-plane`,
  },
  {
    say: 'stroke #61DDAA, stroke-width 2',
    syntax: `infographic list-grid-compact-card
theme dark
  base
    shape
      stroke #61DDAA
      stroke-width 2
data
  lists
    - label Mail
      icon envelope
    - label Chat
      icon comment
    - label Call
      icon phone
    - label Post
      icon paper-plane`,
  },
  {
    say: 'dashed stroke',
    syntax: `infographic list-grid-compact-card
theme dark
  base
    shape
      stroke #F6BD16
      stroke-width 3
      stroke-dasharray 6 4
data
  lists
    - label Mail
      icon envelope
    - label Chat
      icon comment
    - label Call
      icon phone
    - label Post
      icon paper-plane`,
  },
  {
    say: 'fill-opacity 0.35',
    syntax: `infographic list-grid-compact-card
theme dark
  base
    shape
      fill-opacity 0.35
data
  lists
    - label Mail
      icon envelope
    - label Chat
      icon comment
    - label Call
      icon phone
    - label Post
      icon paper-plane`,
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
