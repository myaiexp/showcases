// BtnAdd and BtnRemove in a BtnsGroup: present in the SVG, hidden, indexed
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { STRUCTURE } from './structure.tsx';

const ALL = [
  { label: 'Plan', desc: 'Scope it', icon: 'list-check' },
  { label: 'Build', desc: 'Make it', icon: 'hammer' },
  { label: 'Test', desc: 'Prove it', icon: 'flask' },
  { label: 'Ship', desc: 'Release it', icon: 'rocket' },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    hint: 'In 0.2.20 the renderer keeps the buttons group at display:none, even with editable on: the markers are in the SVG, the buttons are not drawn.',
  });
  const side = stage.side('Buttons in the SVG');
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 12 : 36,
      theme: 'dark',
      editable: !ctx.preview,
      design: { structure: { type: STRUCTURE, gap: 30 }, item: 'simple' },
    }),
  );
  const report = () => {
    const group = stage.box.querySelector('[data-element-type="btns-group"]');
    const adds = [...stage.box.querySelectorAll('[data-element-type="btn-add"]')];
    const removes = [...stage.box.querySelectorAll('[data-element-type="btn-remove"]')];
    stage.say(`BtnsGroup display="${group?.getAttribute('display')}": ${adds.length} BtnAdd, ${removes.length} BtnRemove`);
    if (side) {
      const line = (n: Element) => `${n.getAttribute('data-element-type')}  indexes=${n.getAttribute('data-indexes')}  x=${n.getAttribute('x')}`;
      side.textContent = [...adds, ...removes].map(line).join('\n');
    }
  };
  const show = (count: number) => {
    infographic.render({ data: { lists: ALL.slice(0, count) } });
    report();
  };
  show(3);

  stage.cycle([3, 4, 2, 3].map((n) => ({ run: () => show(n), hold: ctx.preview ? 1600 : 2600 })));
  return () => stage.dispose();
};

export default mount;
