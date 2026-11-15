// svg: style, attributes, id and className on the rendered <svg> (one class)
import { Infographic } from '@antv/infographic';
import type { InfographicOptions } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

const SVGS: { name: string; svg: NonNullable<InfographicOptions['svg']> }[] = [
  { name: 'style: border radius and an outline', svg: { style: { borderRadius: '28px', outline: '3px solid #F6BD16' } } },
  { name: "id: 'launch-plan' and className: 'plan-svg'", svg: { id: 'launch-plan', className: 'plan-svg', style: { outline: '3px solid #61DDAA', borderRadius: '8px' } } },
  { name: 'attributes: a data attribute and opacity', svg: { attributes: { 'data-kind': 'demo', opacity: 0.55 }, style: { outline: '3px dashed #F08BB4' } } },
  { name: 'background: false', svg: { background: false, style: { outline: '1px solid #666' } } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('svg element');
  let infographic: Infographic | null = null;

  stage.cycle(
    SVGS.map(({ name, svg }) => ({
      run: () => {
        // A fresh instance per step: update() would merge svg objects key by key, keeping the old id.
        infographic?.destroy();
        infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, svg }));
        infographic.render(SYNTAX);
        const node = stage.box.querySelector('svg');
        const seen = node ? `id=${node.id || '(none)'} class=${node.getAttribute('class') ?? '(none)'} data-kind=${node.dataset['kind'] ?? '(none)'}` : 'no svg';
        stage.say(`${name} -> ${seen}`);
        if (side) side.textContent = `${JSON.stringify(svg, null, 2)}\n\nstyle="${node?.getAttribute('style') ?? ''}"`;
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
