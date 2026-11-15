// Illus in a custom item: the slot for an illustration, sized by props
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const DATA = { lists: [{ label: 'Plan', illus: 'planning' }, { label: 'Build', illus: 'coding' }, { label: 'Ship', illus: 'rocket' }] };

const STEPS: { say: string; props: object }[] = [
  { say: '120 x 90', props: { } },
  { say: '200 x 90, rx 16', props: { width: 200, height: 90, rx: 16 } },
  { say: '90 x 90, rx 45: round', props: { width: 90, height: 90, rx: 45 } },
  { say: '150 x 60', props: { width: 150, height: 60, rx: 6 } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('design.item');
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));

  stage.cycle(
    STEPS.map(({ say, props }) => ({
      say,
      run: () => {
        const item = { type: ITEM, ...props };
        infographic.render({ design: { structure: { type: 'list-row', gap: 24 }, item }, data: DATA });
        if (side) side.textContent = JSON.stringify(item, null, 2);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
