// getItems(): the registered item names, each one drawn in the same list-row
import { getItems, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  lists: [
    { label: 'Plan', desc: 'Scope it', icon: 'list-check', value: 40 },
    { label: 'Build', desc: 'Make it', icon: 'hammer', value: 70 },
    { label: 'Ship', desc: 'Release it', icon: 'rocket', value: 95 },
  ],
};
const SHOWN = ['simple', 'compact-card', 'badge-card', 'ribbon-card', 'capsule-item', 'progress-card', 'indexed-card', 'pill-badge'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const all = getItems();
  const names = SHOWN.filter((n) => all.includes(n));
  const side = stage.side(`getItems(): ${all.length} types`);
  if (side) side.textContent = all.join('\n');

  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));
  stage.cycle(
    names.map((item) => ({
      say: `getItems() -> ${all.length} names; design.item: '${item}'`,
      run: () => infographic.render({ design: { structure: 'list-row', item: { type: item } }, data: DATA }),
      hold: ctx.preview ? 1400 : 2200,
    })),
  );
  return () => stage.dispose();
};

export default mount;
