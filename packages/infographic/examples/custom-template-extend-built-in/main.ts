// getTemplate plus registerTemplate: extend a built-in template
import { Infographic, getTemplate, registerTemplate } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


const base = getTemplate('list-column-simple-vertical-arrow');
registerTemplate('showcase-tall-column', {
  ...base,
  design: { ...base?.design, structure: { type: 'list-column', gap: 36 }, item: 'badge-card' },
  themeConfig: { ...base?.themeConfig, palette: ['#22D3EE', '#A78BFA', '#F472B6'] },
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'built-in list-column-simple-vertical-arrow',
    syntax: `infographic list-column-simple-vertical-arrow
theme dark
data
  title Day plan
  lists
    - label Wake
      desc Light first
      icon sun
    - label Work
      desc One thing at a time
      icon laptop
    - label Rest
      desc Screens off
      icon moon`,
  },
  {
    say: 'showcase-tall-column: spread of it, item badge-card, new palette',
    syntax: `infographic showcase-tall-column
theme dark
data
  title Day plan
  lists
    - label Wake
      desc Light first
      icon sun
      value 6
    - label Work
      desc One thing at a time
      icon laptop
      value 9
    - label Rest
      desc Screens off
      icon moon
      value 22`,
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
