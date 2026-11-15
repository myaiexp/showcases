// exportToSVG(): a rendered <svg> cloned to a standalone element, shown beside it
import { exportToSVG, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-grid-compact-card
theme dark
data
  title Exported
  lists
    - label Fast
      icon bolt
    - label Small
      icon compress
    - label Clear
      icon eye`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const live = document.createElement('div');
  live.style.cssText = 'flex:1;position:relative;min-width:0';
  const copy = document.createElement('div');
  copy.style.cssText = 'flex:1;position:relative;min-width:0;border-radius:6px;background:repeating-conic-gradient(#2a2a2e 0 25%, #1b1b1e 0 50%) 0 0/16px 16px';
  stage.box.append(live, copy);
  const infographic = stage.own(new Infographic({ container: live, width: '100%', height: '100%', padding: ctx.preview ? 4 : 16 }));
  infographic.render(SYNTAX);

  const run = async (removeBackground: boolean) => {
    const node = live.querySelector('svg');
    if (!node) return;
    const exported = await exportToSVG(node as SVGSVGElement, { removeBackground });
    if (stage.disposed) return;
    exported.setAttribute('width', '100%');
    exported.setAttribute('height', '100%');
    copy.replaceChildren(exported);
    stage.say(`exportToSVG(svg, { removeBackground: ${removeBackground} }) -> <${exported.tagName}>, ${exported.querySelectorAll('*').length} nodes`);
  };
  stage.select('removeBackground', ['false', 'true'], 'false', (v) => void run(v === 'true'));
  stage.cycle([{ run: () => run(false), hold: 1800 }, { run: () => run(true), hold: 1800 }]);
  return () => stage.dispose();
};

export default mount;
