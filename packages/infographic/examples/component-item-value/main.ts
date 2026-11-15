// ItemValue in a custom item: the formatter prop turns a number into text
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const DATA = { lists: [{ label: 'Plan', value: 40 }, { label: 'Build', value: 70 }, { label: 'Ship', value: 95 }] };

const STEPS: { say: string; props: object }[] = [
  { say: 'no formatter: String(value)', props: { } },
  { say: 'formatter: v => v + "%"', props: { formatter: (v: number) => `${v}%`, fontSize: 28 } },
  { say: 'formatter: tenths of a thousand', props: { formatter: (v: number) => "$" + (v / 10).toFixed(1) + "k", fontSize: 28 } },
  { say: 'formatter: a word for it', props: { formatter: (v: number) => (v > 80 ? "done" : v > 50 ? "moving" : "started"), fontSize: 20 } },
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
