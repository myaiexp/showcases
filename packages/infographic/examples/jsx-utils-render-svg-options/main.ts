// renderSVG options: a fitted viewBox, a sized one, an explicit one and style
import { parseSVG, renderSVG } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scene } from './scene.tsx';

// Each step is the same JSX tree rendered with different options.
const STEPS = [
  { say: 'no options: the viewBox fits the bounds of the shapes', options: {} },
  { say: 'width 320, height 200: that is the viewBox', options: { width: 320, height: 200 } },
  { say: 'viewBox "40 40 120 120": crops to the middle', options: { viewBox: '40 40 120 120' } },
  { say: 'style: a background colour on the svg', options: { width: 320, height: 200, style: { background: '#1e293b' } } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 300 });
  const code = stage.side('Options and svg tag');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        const svg = renderSVG(scene(), step.options);
        const parsed = parseSVG<SVGSVGElement>(svg);
        if (code) code.textContent = 'renderSVG(scene(), ' + JSON.stringify(step.options) + ')\n\n' + svg.slice(0, svg.indexOf('>') + 1);
        parsed?.setAttribute('width', '100%');
        parsed?.setAttribute('height', '100%');
        stage.box.replaceChildren(...(parsed ? [parsed] : []));
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
