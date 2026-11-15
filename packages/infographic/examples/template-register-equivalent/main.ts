// registerTemplate(): infographic <name> draws the same as a design block
import { Infographic, registerTemplate } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

registerTemplate('showcase-simple-list', {
  design: {
    structure: 'list-row',
    item: 'simple',
  },
});

const STEPS = [
  {
    say: 'A design block: structure list-row, item simple',
    syntax: `
design
  structure list-row
  item simple
theme dark
data
  title Same picture
  lists
    - label Alpha
      desc From a design block
    - label Beta
      desc Also from a design block`,
  },
  {
    say: 'registerTemplate("showcase-simple-list", ...) then infographic showcase-simple-list',
    syntax: `
infographic showcase-simple-list
theme dark
data
  title Same picture
  lists
    - label Alpha
      desc From a registered template
    - label Beta
      desc Also from a registered template`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
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
