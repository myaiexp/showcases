// getStructures(): the registered names, each one rendered with the same data
import { getStructures, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  title: 'One data set',
  items: [{ label: 'Plan', desc: 'Scope it' }, { label: 'Build', desc: 'Make it' }, { label: 'Test', desc: 'Prove it' }, { label: 'Ship', desc: 'Release it' }],
};
// A readable sample of the registry: the structures that take this flat list.
const SHOWN = ['list-row', 'list-column', 'list-grid', 'list-pyramid', 'list-sector', 'sequence-steps', 'sequence-timeline', 'sequence-funnel', 'sequence-snake-steps'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 360 });
  const all = getStructures();
  const names = SHOWN.filter((n) => all.includes(n));
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:1;position:relative;min-width:0';
  stage.box.append(drawn);
  const chips = stage.side(`getStructures(): ${all.length} types`);
  if (chips) chips.textContent = all.join('\n');

  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));
  stage.cycle(
    names.map((structure) => ({
      say: `getStructures() -> ${all.length} names; design.structure: '${structure}'`,
      run: () => infographic.render({ design: { structure, item: 'simple' }, data: DATA }),
    })),
  );
  return () => stage.dispose();
};

export default mount;
