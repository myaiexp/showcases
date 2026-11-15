// ItemsGroup in a custom row: the gap changes, the group counts are read back
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { STRUCTURE } from './structure.tsx';

const DATA = {
  title: 'Items in a group',
  lists: [
    { label: 'Plan', desc: 'Scope it', icon: 'list-check' },
    { label: 'Build', desc: 'Make it', icon: 'hammer' },
    { label: 'Ship', desc: 'Release it', icon: 'rocket' },
  ],
};
const GAPS = [8, 40, 0, 24];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));

  stage.cycle(
    GAPS.map((gap) => ({
      run: () => {
        infographic.render({ design: { structure: { type: STRUCTURE, gap }, item: 'simple' }, data: DATA });
        const groups = stage.box.querySelectorAll('[data-element-type="items-group"]').length;
        const labels = stage.box.querySelectorAll('[data-element-type="item-label"]').length;
        stage.say(`structure gap: ${gap}; ${groups} items-group node, ${labels} item labels`);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
