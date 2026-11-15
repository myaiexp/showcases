// render() with an options object: one data object, a different template per step
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  title: 'Launch checklist',
  desc: 'The same data object under four templates',
  lists: [
    { label: 'Design', desc: 'Sketch the idea', icon: 'pen' },
    { label: 'Build', desc: 'Write the code', icon: 'code' },
    { label: 'Ship', desc: 'Release it', icon: 'rocket' },
  ],
};

const TEMPLATES = [
  'list-row-simple-horizontal-arrow',
  'list-grid-compact-card',
  'list-column-simple-vertical-arrow',
  'list-zigzag-down-compact-card',
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
  const code = stage.side('Options');

  stage.cycle(
    TEMPLATES.map((template) => ({
      say: `template: '${template}'`,
      run: () => {
        const options = { template, theme: 'dark', data: DATA };
        infographic.render(options);
        if (code) code.textContent = JSON.stringify(options, null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
