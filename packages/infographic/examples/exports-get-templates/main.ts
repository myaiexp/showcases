// getTemplates(): the registered ids, samples from each family rendered
import { getTemplates, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const ITEMS = [{ label: 'Plan', desc: 'Scope it' }, { label: 'Build', desc: 'Make it' }, { label: 'Ship', desc: 'Release it' }];
/** The data field each family of templates reads. */
const DATA: Record<string, object> = {
  list: { lists: ITEMS },
  sequence: { sequences: ITEMS },
  hierarchy: { root: { label: 'Product', children: [{ label: 'Web' }, { label: 'Mobile' }] } },
  compare: { compares: [{ label: 'Before', children: [{ label: 'Slow' }] }, { label: 'After', children: [{ label: 'Fast' }] }] },
  chart: { values: [{ label: 'Q1', value: 12 }, { label: 'Q2', value: 30 }, { label: 'Q3', value: 22 }] },
  relation: { nodes: [{ id: 'a', label: 'Plan' }, { id: 'b', label: 'Ship' }], relations: [{ from: 'a', to: 'b' }] },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const all = getTemplates();
  const side = stage.side(`getTemplates(): ${all.length} ids`);
  if (side) side.textContent = all.join('\n');
  // The first template of each family (by its prefix) that this gallery can feed.
  const picks = Object.keys(DATA).flatMap((family) => all.find((id) => id.startsWith(`${family}-`)) ?? []);
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));

  stage.cycle(
    picks.map((template) => ({
      say: `getTemplates() -> ${all.length} ids; template: '${template}'`,
      run: () => infographic.render({ template, data: DATA[template.split('-')[0] as string] as never }),
    })),
  );
  return () => stage.dispose();
};

export default mount;
