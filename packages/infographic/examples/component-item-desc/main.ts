// ItemDesc in a custom item: lineNumber decides how many lines show
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const DATA = { lists: [{ label: 'Plan', desc: 'Scope the work, pick a date, and write down what done looks like' }, { label: 'Build', desc: 'Write the code and the tests that cover it, then review' }] };

const STEPS: { say: string; props: object }[] = [
  { say: 'lineNumber 1: one line, clipped', props: { lineNumber: 1 } },
  { say: 'lineNumber 2 (the default)', props: { lineNumber: 2 } },
  { say: 'lineNumber 4: room for it all', props: { lineNumber: 4 } },
  { say: 'lineNumber 4, width 120', props: { lineNumber: 4, width: 120 } },
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
