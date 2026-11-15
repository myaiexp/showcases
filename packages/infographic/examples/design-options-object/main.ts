// The design field as an object: structure, item and title with a type each
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  title: 'Design as an object',
  desc: 'options.design with structure, item and title',
  lists: [
    { label: 'Step 1', desc: 'Start', icon: 'flag' },
    { label: 'Step 2', desc: 'In Progress', icon: 'gear' },
    { label: 'Step 3', desc: 'Complete', icon: 'trophy' },
  ],
};

const DESIGNS = [
  {
    structure: { type: 'list-row', gap: 20 },
    item: { type: 'simple' },
    title: { type: 'default', alignHorizontal: 'left' },
  },
  {
    structure: { type: 'list-row', gap: 0, zigzag: true },
    item: { type: 'horizontal-icon-arrow' },
    title: 'default',
  },
  {
    structure: { type: 'list-column', gap: 8 },
    item: { type: 'compact-card' },
    title: 'default',
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('design');

  stage.cycle(
    DESIGNS.map((design) => ({
      say: `design.structure: ${design.structure.type}, design.item: ${design.item.type}`,
      run: () => {
        infographic.render({ design, data: DATA, theme: 'dark' });
        if (code) code.textContent = JSON.stringify(design, null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
