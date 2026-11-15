// renderSVG() turns a JSX component into an SVG string, shown drawn and as text
import { parseSVG, renderSVG } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { nodeElement } from './node.tsx';

const COLOURS = ['blue', '#c2410c', '#15803d', '#7c3aed'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 260 });
  const code = stage.side('renderSVG() output');

  stage.cycle(
    COLOURS.map((fill, i) => ({
      say: `<Node fill="${fill}" /> → renderSVG()`,
      run: () => {
        const svg = renderSVG(nodeElement(fill, `Hello World ${i + 1}`));
        if (code) code.textContent = svg;
        // The string is a whole <svg> whose viewBox fits the drawn bounds.
        const node = parseSVG<SVGSVGElement>(svg);
        node?.setAttribute('width', '100%');
        node?.setAttribute('height', '100%');
        stage.box.replaceChildren(...(node ? [node] : []));
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
