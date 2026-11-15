// new Infographic({ ... }): the options-object form, drawn by render()
import { Infographic } from '@antv/infographic';
import type { InfographicOptions } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('Constructor argument');
  let current: Infographic | null = null;

  const variants: Partial<InfographicOptions>[] = [
    {
      template: 'list-row-simple-horizontal-arrow',
      theme: 'dark',
      data: { lists: [{ label: 'Plan', desc: 'Scope it' }, { label: 'Build', desc: 'Make it' }, { label: 'Ship', desc: 'Release it' }] },
    },
    {
      template: 'list-grid-compact-card',
      theme: 'dark',
      data: { title: 'Options object', lists: [{ label: 'Fast', icon: 'bolt' }, { label: 'Small', icon: 'compress' }, { label: 'Clear', icon: 'eye' }, { label: 'Open', icon: 'lock-open' }] },
    },
    {
      template: 'sequence-steps-simple',
      theme: 'light',
      data: { sequences: [{ label: 'One' }, { label: 'Two' }, { label: 'Three' }, { label: 'Four' }] },
    },
  ];

  stage.cycle(
    variants.map((options) => ({
      say: `new Infographic({ template: '${options.template}', theme: '${options.theme}', data })`,
      run: () => {
        current?.destroy();
        current = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, ...options }));
        current.render();
        if (side) side.textContent = JSON.stringify(options, null, 2);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
