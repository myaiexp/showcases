// getElementBounds: the measured bounds of a rect, a group and a component
import { parseSVG, renderSVG } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { SCENES } from './scenes.tsx';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 300 });
  const code = stage.side('renderSVG() output');

  stage.cycle(
    SCENES.map(({ say, node, note }) => ({
      say,
      run: () => {
        // width and height here become the viewBox of the returned <svg>.
        const svg = renderSVG(node, { width: 320, height: 200 });
        if (code) code.textContent = (note ? note + '\n\n' : '') + svg;
        const parsed = parseSVG<SVGSVGElement>(svg);
        parsed?.setAttribute('width', '100%');
        parsed?.setAttribute('height', '100%');
        stage.box.replaceChildren(...(parsed ? [parsed] : []));
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
