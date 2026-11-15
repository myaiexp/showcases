// ItemLabel in a custom item: width, size, fill and alignment
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const DATA = { lists: [{ label: 'Plan the launch' }, { label: 'Build the thing' }, { label: 'Ship it' }] };

const STEPS: { say: string; props: object }[] = [
  { say: 'width 160, font size 18', props: { } },
  { say: 'width 90: the label wraps', props: { width: 90 } },
  { say: 'fontSize 30, fill gold', props: { fontSize: 30, fill: "#F6BD16" } },
  { say: 'alignHorizontal left', props: { alignHorizontal: "left", width: 200 } },
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
