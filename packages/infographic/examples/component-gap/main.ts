// Gap in a FlexLayout: a placeholder that only spaces its neighbours
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const DATA = { lists: [{ label: 'Plan', icon: 'list-check' }, { label: 'Build', icon: 'hammer' }, { label: 'Ship', icon: 'rocket' }] };

const STEPS: { say: string; props: object }[] = [
  { say: '<Gap width={8} />', props: { gapWidth: 8 } },
  { say: '<Gap width={0} />', props: { gapWidth: 0 } },
  { say: '<Gap width={24} />', props: { gapWidth: 24 } },
  { say: '<Gap width={48} />', props: { gapWidth: 48 } },
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
