// ItemIconCircle in a custom item: size, circle fill and colorBg
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const DATA = { lists: [{ label: 'Plan', icon: 'list-check' }, { label: 'Build', icon: 'hammer' }, { label: 'Ship', icon: 'rocket' }] };

const STEPS: { say: string; props: object }[] = [
  { say: 'size 50 (the default)', props: { } },
  { say: 'size 80, fill pink', props: { size: 80, fill: "#F08BB4" } },
  { say: 'colorBg cream behind the icon', props: { size: 64, fill: "#1d4ed8", colorBg: "#fff3c4" } },
  { say: 'size 36, fill green', props: { size: 36, fill: "#15803d" } },
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
