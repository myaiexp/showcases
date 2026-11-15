// ItemIcon in a custom item: size and fill of the icon slot
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const DATA = { lists: [{ label: 'Plan', icon: 'list-check' }, { label: 'Build', icon: 'hammer' }, { label: 'Ship', icon: 'rocket' }] };

const STEPS: { say: string; props: object }[] = [
  { say: 'size 32 (the default)', props: { } },
  { say: 'size 56', props: { size: 56 } },
  { say: 'size 80, fill gold', props: { size: 80, fill: "#F6BD16" } },
  { say: 'size 24', props: { size: 24, fill: "#61DDAA" } },
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
