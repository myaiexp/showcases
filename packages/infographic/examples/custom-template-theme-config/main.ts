// registerTemplate with a design and a themeConfig palette
import { Infographic, registerTemplate } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


// Page-wide name. The template holds design and theme; data comes from the syntax.
registerTemplate('showcase-citrus-steps', {
  design: { structure: 'sequence-steps', title: 'default', item: 'simple' },
  theme: 'dark',
  themeConfig: { palette: ['#F9C74F', '#F9844A', '#90BE6D', '#43AA8B'] },
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'infographic showcase-citrus-steps, 3 items',
    syntax: `infographic showcase-citrus-steps
data
  title Paper trail
  sequences
    - label Idea
      desc Sketch it
      icon lightbulb
    - label Draft
      desc Write it down
      icon pen
    - label Print
      desc Make copies
      icon print`,
  },
  {
    say: 'the same template, 4 items',
    syntax: `infographic showcase-citrus-steps
data
  title Paper trail
  sequences
    - label Idea
      desc Sketch it
      icon lightbulb
    - label Draft
      desc Write it down
      icon pen
    - label Print
      desc Make copies
      icon print
    - label Share
      desc Hand it out
      icon share-nodes`,
  },
  {
    say: 'a theme block in the syntax still wins over the template',
    syntax: `infographic showcase-citrus-steps
theme dark
  palette
    - #A78BFA
    - #38BDF8
data
  title Paper trail
  sequences
    - label Idea
      desc Sketch it
      icon lightbulb
    - label Draft
      desc Write it down
      icon pen
    - label Print
      desc Make copies
      icon print
    - label Share
      desc Hand it out
      icon share-nodes`,
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

  return () => {
    stage.dispose();
  };
};

export default mount;
