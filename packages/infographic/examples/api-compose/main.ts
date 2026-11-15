// compose(): the pre-rendered SVG template, set beside the finished render()
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = (title: string) => `
infographic list-row-simple-horizontal-arrow
theme dark
data
  title ${title}
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

const pane = (parent: HTMLElement) => {
  const d = document.createElement('div');
  d.style.cssText = 'flex:1;min-width:0;position:relative;display:flex;flex-direction:column;font:11px sans-serif;color:#aaa';
  parent.append(d);
  return d;
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const [left, right] = [pane(stage.box), pane(stage.box)];
  for (const [p, label] of [[left, 'render()'], [right, 'compose(parsedOptions)']] as const) {
    const cap = document.createElement('div');
    cap.textContent = label;
    p.append(cap);
  }
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:1;position:relative';
  const composed = document.createElement('div');
  composed.style.cssText = 'flex:1;position:relative';
  left.append(drawn);
  right.append(composed);

  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 4 : 24 }));
  const titles = ['Draft', 'Review', 'Final'];
  stage.cycle(
    titles.map((title) => ({
      say: `title "${title}": render() and compose()`,
      run: () => {
        infographic.render(SYNTAX(title));
        // compose() takes ParsedInfographicOptions. The instance keeps its parsed copy privately.
        const parsed = (infographic as unknown as { parsedOptions: Parameters<Infographic['compose']>[0] }).parsedOptions;
        const svg = infographic.compose(parsed);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        composed.replaceChildren(svg);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
