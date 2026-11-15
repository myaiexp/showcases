// An item block takes its own options, here showIcon, iconType and usePaletteColor of simple
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'showIcon true',
    syntax: `infographic
design
  structure list-grid
  item simple
    showIcon true
  title default
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
    say: 'showIcon false',
    syntax: `infographic
design
  structure list-grid
  item simple
    showIcon false
  title default
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
    say: 'iconType circle',
    syntax: `infographic
design
  structure list-grid
  item simple
    showIcon true
    iconType circle
  title default
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
    say: 'usePaletteColor true',
    syntax: `infographic
design
  structure list-grid
  item simple
    showIcon true
    usePaletteColor true
  title default
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
