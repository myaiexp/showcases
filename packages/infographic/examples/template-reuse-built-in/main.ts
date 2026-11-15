// getTemplate() reads a built-in template; registerTemplate() stores an edited copy
import { Infographic, getTemplate, registerTemplate } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const base = getTemplate('list-row-simple-horizontal-arrow');
registerTemplate('showcase-arrow-row-icons', {
  ...base,
  design: { ...base?.design, item: 'horizontal-icon-arrow' },
});

const DATA = `data
  lists
    - label Step 1
      desc Start
      icon flag
    - label Step 2
      desc In Progress
      icon gear
    - label Step 3
      desc Complete
      icon trophy`;

const NAMES = ['list-row-simple-horizontal-arrow', 'showcase-arrow-row-icons'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('getTemplate()');

  stage.cycle(
    NAMES.map((name) => ({
      say: `infographic ${name}`,
      run: () => {
        infographic.render(`infographic ${name}\ntheme dark\n${DATA}`);
        if (code) code.textContent = JSON.stringify(getTemplate(name), null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
